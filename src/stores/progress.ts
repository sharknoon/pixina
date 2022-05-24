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
    amountTiles(state) {
      return (
        state.finished + state.inProgress + state.reserved + state.available
      );
    },
    validState(): boolean {
      return this.amountTiles === 500;
    },
  },
});
