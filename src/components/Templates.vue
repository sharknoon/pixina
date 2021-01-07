<template>
  <div>
    <h3 class="p-3 pb-0 m-0">Favoriten</h3>
    <TileSelection :onlyFavorites="true" />
    <h3 class="p-3 pb-0 m-0">Alle Vorlagen</h3>
    <TileSelection />
  </div>
</template>
<script>
import Tile from "./tiles/Tile";
import TileSelection from "./tools/TileSelection.vue";

export default {
  name: "Templates",
  data() {
    return {
      tiles: [],
    };
  },
  components: {
    Tile,
    TileSelection,
  },
};
</script>
<style lang=scss scoped>
</style>
