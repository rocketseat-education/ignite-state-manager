import { createStore } from './store'

const counterElement = document.getElementById('counter') as HTMLHeadingElement
const incrementButton = document.getElementById('incrementButton') as HTMLButtonElement
const decrementButton = document.getElementById('decrementButton') as HTMLButtonElement

const counterStore = createStore({
  counter: 0,

  increment() {
    this.counter = ++this.counter
  },

  decrement() {
    if (this.counter === 0) {
      return
    }

    this.counter = --this.counter
  }
})

incrementButton.addEventListener('click', () => {
  counterStore.increment()
})

decrementButton.addEventListener('click', () => {
  counterStore.decrement()
})

counterStore.watch('counter', ({ counter }) => {
  counterElement.textContent = String(counter)
})