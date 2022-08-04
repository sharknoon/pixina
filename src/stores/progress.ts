import { defineStore } from "pinia";

export const useProgressStore = defineStore("progress", {
  state: () => {
    return {
      error: false,
      finished: 0,
      inProgress: 0,
      reserved: 0,
      available: 0,
    };
  },
  getters: {
    isLoaded(state): boolean {
      return (
        state.finished + state.inProgress + state.reserved + state.available > 0
      );
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
          progress.error = true;
          console.error(error);
        });
    } else {
      progress.error = true;
      console.error(response);
    }
  })
  .catch((error: Error) => {
    progress.error = true;
    console.error(error);
  });
