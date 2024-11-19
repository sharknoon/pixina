import { defineStore } from "pinia";
import type { UnsubscribeFunc } from "pocketbase";

export const useFavoriteTilesStore = defineStore(
  "favorite-tiles",
  () => {
    const pocketBase = usePocketBase();

    const favoriteTiles = ref<number[]>([]);

    function isFavorite(tile: number) {
      return favoriteTiles.value.includes(tile);
    }

    function toggleFavoriteTile(tile: number) {
      const index = favoriteTiles.value.indexOf(tile);
      if (index >= 0) {
        removeFavoriteTile(tile);
      } else {
        addFavoriteTile(tile);
      }
    }

    async function getCloudFavoriteTiles(): Promise<number[] | undefined> {
      if (!pocketBase.authStore.model) return;
      const user = await pocketBase
        .collection("users")
        .getOne(pocketBase.authStore.model.id);
      if (!user) return;
      return user.favorite_tiles;
    }

    async function setCloudFavoriteTiles(favoriteTiles: number[]) {
      if (!pocketBase.authStore.model) return;
      await pocketBase
        .collection("users")
        .update(pocketBase.authStore.model.id, {
          favorite_tiles: JSON.stringify(favoriteTiles),
        });
      console.log("Updated favorite tiles in the cloud");
    }

    function addFavoriteTile(tile: number) {
      favoriteTiles.value.push(tile);
      getCloudFavoriteTiles().then((cloudFavoriteTiles) => {
        if (!cloudFavoriteTiles) return;
        if (!cloudFavoriteTiles.includes(tile)) {
          setCloudFavoriteTiles([...cloudFavoriteTiles, tile]);
        }
      });
    }

    function removeFavoriteTile(tile: number) {
      const index = favoriteTiles.value.indexOf(tile);
      if (index >= 0) {
        favoriteTiles.value.splice(index, 1);
      }
      getCloudFavoriteTiles().then((cloudFavoriteTiles) => {
        if (!cloudFavoriteTiles) return;
        const cloudIndex = cloudFavoriteTiles.indexOf(tile);
        if (cloudIndex >= 0) {
          cloudFavoriteTiles.splice(cloudIndex, 1);
          setCloudFavoriteTiles(cloudFavoriteTiles);
        }
      });
    }

    return {
      favoriteTiles,
      isFavorite,
      toggleFavoriteTile,
      getCloudFavoriteTiles,
      setCloudFavoriteTiles,
    };
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
