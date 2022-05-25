import { defineStore } from "pinia";

export const useProgressStore = defineStore("progress", {
  state: () => {
    return {
      finished: 0,
      inProgress: 0,
      reserved: 0,
      available: 0,
    };
  },
  getters: {
    amountTiles(state): number {
      return (
        state.finished + state.inProgress + state.reserved + state.available
      );
    },
    isLoaded(): boolean {
      return this.amountTiles > 0;
    },
    isError(): boolean {
      return this.amountTiles < 0;
    },
    validState(): boolean {
      return this.amountTiles === 500;
    },
  },
});

const progress = useProgressStore();

fetch("https://pixina.app/api/v1/progress")
  .then((response: Response) => {
    if (response.status >= 200 && response.status <= 299) {
      response
        .json()
        .then((data) => {
          progress.finished = data.finished;
          progress.inProgress = data.inProgress;
          progress.reserved = data.reserved;
          progress.available =
            500 - data.finished - data.inProgress - data.reserved;
        })
        .catch((error: Error) => {
          progress.finished = -1;
          console.error(error);
        });
    } else {
      console.error(response);
    }
  })
  .catch((error: Error) => {
    console.error(error);
  });
