import { createStore } from './store'

const contentElement = document.getElementById('content') as HTMLTextAreaElement
const contentMirrorElement = document.getElementById('contentMirror') as HTMLTextAreaElement
const contentLengthElement = document.getElementById('contentLength') as HTMLTextAreaElement

const contentStore = createStore({
  content: '',
  length: 0,

  updateContent(value: string) {
    this.content = value
  },

  updateLength(value: number) {
    this.length = value
  }
})

contentStore.watch('content', ({ content }) => {
  contentMirrorElement.textContent = content
})

contentStore.watch('length', ({ length }) => {
  contentLengthElement.textContent = String(length)
})

contentElement.addEventListener('input', ({ target }) => {
  const element = target as HTMLTextAreaElement

  contentStore.updateLength(element.textLength)
  contentStore.updateContent(element.value)
})