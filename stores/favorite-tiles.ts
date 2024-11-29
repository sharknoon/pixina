import { defineStore } from "pinia";

export const useFavoriteTilesStore = defineStore(
  "favorite-tiles",
  () => {
    const pocketBase = usePocketBase();
    const authStore = useAuthStore();

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
      if (!pocketBase.authStore.record) return;
      const user = await pocketBase
        .collection("users")
        .getOne(pocketBase.authStore.record.id);
      if (!user) return;
      return user.favorite_tiles;
    }

    async function setCloudFavoriteTiles(favoriteTiles: number[]) {
      if (!pocketBase.authStore.record) return;
      await pocketBase
        .collection("users")
        .update(pocketBase.authStore.record.id, {
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

    async function syncFavoriteTiles() {
      const cloudFavoriteTiles = await getCloudFavoriteTiles();
      if (cloudFavoriteTiles === undefined) return;
      const mergedFavoriteTiles = Array.from(
        new Set([...cloudFavoriteTiles, ...favoriteTiles.value])
      );
      favoriteTiles.value = mergedFavoriteTiles;
      setCloudFavoriteTiles(mergedFavoriteTiles);
    }

    async function subscribeFavoriteTiles(id: string) {
      await pocketBase.collection("users").subscribe(id, (e) => {
        favoriteTiles.value = e.record.favorite_tiles;
      });
    }

    if (pocketBase.authStore.record) {
      subscribeFavoriteTiles(pocketBase.authStore.record.id);
    }
    authStore.onLogin(async (user) => {
      syncFavoriteTiles();
      await subscribeFavoriteTiles(user.id);
    });

    authStore.onLogout(async () => {
      await pocketBase.collection("users").unsubscribe();
    });

    getCloudFavoriteTiles().then((cloudFavoriteTiles) => {
      if (cloudFavoriteTiles === undefined) return;
      favoriteTiles.value = cloudFavoriteTiles;
    });

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
