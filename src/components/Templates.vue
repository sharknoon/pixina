<template>
  <div>
    <h3 class="p-3 pb-0 m-0">{{ $t("favorites") }}</h3>
    <TileSelection :onlyFavorites="true" />
    <NoFavorites v-if="$store.state.favoriteTiles.length < 1"> </NoFavorites>
    <h3 class="p-3 pb-0 m-0">{{ $t("all-templates") }}</h3>
    <TileSelection />
  </div>
</template>
<script>
import TileSelection from "./tools/TileSelection";
import NoFavorites from "./templates/NoFavorites";

export default {
  name: "Templates",
  components: {
    TileSelection,
    NoFavorites,
  },
};
</script>
