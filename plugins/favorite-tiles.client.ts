export default defineNuxtPlugin(() => {
  const pocketBase = usePocketBase();
  const favoriteTiles = useFavoriteTilesStore();

  favoriteTiles.$subscribe(async (_, newFavoriteTiles) => {
    if (!pocketBase.authStore.model) return;
    try {
      await pocketBase
        .collection("users")
        .update(pocketBase.authStore.model.id, {
          favorite_tiles: JSON.stringify(newFavoriteTiles.favoriteTiles),
        });
      console.log("Uploaded favorite tiles");
    } catch (e) {
      console.log("Failed to upload favorite tiles", e);
    }
  });
});
