const reservedKeys = ['watch'] as const

type Slice<T> = { [K in keyof T]: T[K] }
type WatcherCallback<T> = (slice: Slice<T>) => void
type ReservedProps = typeof reservedKeys[number]
type DisallowProps<T> = T & Partial<Record<ReservedProps, never>>

type ExcludeMethods<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K]
}

export function createStore<T extends Record<string, unknown>>(
  initialState: DisallowProps<T>
) {
  const watchers = new Map<keyof T, WatcherCallback<T>[]>()

  const features = {
    watch<K extends keyof ExcludeMethods<T>, W extends WatcherCallback<Record<K, T[K]>>>(key: K, callback: W) {
      if (!watchers.has(key)) {
        watchers.set(key, [callback])

        return
      }

      const watchersFromKey: WatcherCallback<T>[] = watchers.get(key)!

      watchersFromKey.push(callback)
    }
  }

  const store = new Proxy(Object.assign(initialState as T, features), {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver)
    },

    set(target, prop, value, receiver) {
      const key = prop as keyof T
      const isValueChanged = store[key] !== value
      const isReservedProp = reservedKeys.indexOf(key as ReservedProps) !== -1

      if (isReservedProp) {
        throw new Error(`Cannot override a reserved property: ${String(key)}`)
      }

      if (isValueChanged) {
        if (watchers.has(key)) {
          const watchersFromKey: WatcherCallback<T>[] = watchers.get(key)!

          watchersFromKey.forEach((callback) => {
            callback({ [key]: value } as Slice<T>)
          })
        }
      }

      return Reflect.set(target, prop, value, receiver)
    }
  })

  return store
}
