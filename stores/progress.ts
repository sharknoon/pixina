export const useProgressStore = defineStore("progress", {
  state: () => {
    return {
      error: false,
      finished: [] as number[],
      inProgress: [] as number[],
      reserved: [] as number[],
      availableInStock: [] as number[],
      availableOutOfStock: [] as number[],
    };
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
      );
    },
  },
  actions: {
    async fetchProgress() {
      const runtimeConfig = useRuntimeConfig();
      if (!runtimeConfig.public.apiUrl) {
        this.error = true;
        return;
      }
      await fetch(runtimeConfig.public.apiUrl)
        .then((response: Response) => {
          if (response.status >= 200 && response.status <= 299) {
            response
              .json()
              .then((data) => {
                this.finished = data.finished;
                this.inProgress = data.inProgress;
                this.reserved = data.reserved;
                this.availableInStock = data.availableInStock;
                this.availableOutOfStock = data.availableOutOfStock;
              })
              .catch((error: Error) => {
                this.error = true;
                console.error(error);
              });
          } else {
            this.error = true;
            console.error(response);
          }
        })
        .catch((error: Error) => {
          this.error = true;
          console.error(error);
        });
    },
  },
});
