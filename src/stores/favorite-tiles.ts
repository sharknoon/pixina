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
      const locale: string | null = localStorage.getItem("locale");
      const vuex: string | null = localStorage.getItem("vuex");
      if (!locale && vuex) {
        try {
          const newLocale: string = JSON.parse(vuex).locale;
          localStorage.setItem("locale", JSON.stringify({ locale: newLocale }));
        } catch (e) {
          console.error(e);
        }
      }
    },
  },
});
