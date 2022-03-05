import { defineStore } from "pinia";

export const useFavoriteTilesStore = defineStore("favorite-tiles", {
  state: () => {
    return {
      favoriteTiles: <number[]>[],
    };
  },
  getters: {
    isFavorite: (state) => (tile: number) => {
      return state.favoriteTiles.includes(tile);
    },
  },
  actions: {
    toggleFavoriteTile(tile: number) {
      const index = this.favoriteTiles.indexOf(tile);
      if (index >= 0) {
        this.favoriteTiles.splice(index, 1);
      } else {
        this.favoriteTiles.push(tile);
      }
    },
  },
  persist: {
    // Keep backward compatability
    beforeRestore: () => {
      const vuex: string | null = localStorage.getItem("vuex");
      if (vuex) {
        try {
          const newFavoriteTiles: string = JSON.parse(vuex).favoriteTiles;
          localStorage.setItem(
            "favorite-tiles",
            JSON.stringify({ favoriteTiles: newFavoriteTiles })
          );
          localStorage.removeItem("vuex");
        } catch (e) {
          console.error(e);
        }
      }
    },
  },
});
