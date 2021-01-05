<template>
  <div>
    <h3 class="p-3 pb-0 m-0">Favoriten</h3>
    <TileSelection
      v-if="openTile == null"
      @tile-selected="setOpenTile"
      :onlyFavorites="true"
    />
    <h3 class="p-3 pb-0 m-0">Alle Vorlagen</h3>
    <TileSelection v-if="openTile == null" @tile-selected="setOpenTile" />
    <Tile
      v-if="openTile != null"
      :tile="openTile"
      @closeTile="openTile = null"
    />
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
      openTile: null,
    };
  },
  methods: {
    setOpenTile(tile) {
      this.openTile = tile;
    },
  },
  components: {
    Tile,
    TileSelection,
  },
};
</script>
<style lang=scss scoped>
</style>
