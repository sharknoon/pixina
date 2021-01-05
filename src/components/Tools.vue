<template>
  <div id="tools-wrapper" class="h-100">
    <TileSelection
      v-if="state == 'tile-selection'"
      :multi-selection="true"
      @tiles-selected="setSelectedTiles"
    />
    <TileColors
      v-if="state == 'counted-colors'"
      :tiles="selected_tiles"
      @close="state = 'tile-selection'"
    />
  </div>
</template>
<script>
import TileSelection from "./tools/TileSelection";
import TileColors from "./tools/TileColors";

export default {
  name: "Tools",
  data() {
    return {
      // "tile-selection" or "counted-colors"
      state: "tile-selection",
      selected_tiles: [],
    };
  },
  components: {
    TileSelection,
    TileColors,
  },
  methods: {
    setSelectedTiles(tiles) {
      this.selected_tiles = tiles;
      this.state = "counted-colors";
    },
  },
};
</script>
