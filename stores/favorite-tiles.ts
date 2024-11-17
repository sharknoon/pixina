import { defineStore } from "pinia";

export const useFavoriteTilesStore = defineStore(
  "favorite-tiles",
  () => {
    const favoriteTiles = ref<number[]>([]);

    function isFavorite(tile: number) {
      return favoriteTiles.value.includes(tile);
    }

    function toggleFavoriteTile(tile: number) {
      const index = favoriteTiles.value.indexOf(tile);
      if (index >= 0) {
        favoriteTiles.value.splice(index, 1);
      } else {
        favoriteTiles.value.push(tile);
      }
    }

    return { favoriteTiles, isFavorite, toggleFavoriteTile };
  },
  {
    persist: {
      // Keep backward compatability
      beforeHydrate: () => {
        if (typeof localStorage === "undefined") {
          return;
        }
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
  }
);
