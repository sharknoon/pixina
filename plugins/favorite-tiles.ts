//const favoriteTilesStore = useFavoriteTilesStore();
//const pocketBase = usePocketBase();

export default defineNuxtPlugin((_) => {
  /*watch(favoriteTilesStore.favoriteTiles, (favoriteTiles) => {
    if (pocketBase.authStore.model?.id) {
      pocketBase.collection("users").update(pocketBase.authStore.model?.id, {
        favorite_tiles: favoriteTiles,
      });
    }
  });*/
});
