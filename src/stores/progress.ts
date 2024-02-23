import { defineStore } from 'pinia'

export const useProgressStore = defineStore('progress', {
  state: () => {
    return {
      error: false,
      finished: [],
      inProgress: [],
      reserved: [],
      availableInStock: [],
      availableOutOfStock: []
    }
  },
  getters: {
    isLoaded(state): boolean {
      return (
        state.finished.length +
          state.inProgress.length +
          state.reserved.length +
          state.availableInStock.length +
          state.availableOutOfStock.length >
        0
      )
    }
  }
})

const progress = useProgressStore()

fetch('https://pixina.app/api/v1/progress')
  .then((response: Response) => {
    if (response.status >= 200 && response.status <= 299) {
      response
        .json()
        .then((data) => {
          progress.finished = data.finished
          progress.inProgress = data.inProgress
          progress.reserved = data.reserved
          progress.availableInStock = data.availableInStock
          progress.availableOutOfStock = data.availableOutOfStock
        })
        .catch((error: Error) => {
          progress.error = true
          console.error(error)
        })
    } else {
      progress.error = true
      console.error(response)
    }
  })
  .catch((error: Error) => {
    progress.error = true
    console.error(error)
  })
