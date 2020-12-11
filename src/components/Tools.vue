<template>
  <div id="history-wrapper" class="h-100 d-flex flex-column">
    <div class="d-flex flex-wrap justify-content-evenly p-2">
      <div
        v-for="tile in tiles"
        :key="tile.number"
        class="position-relative m-2"
        @click="toggleTileSelection(tile.number)"
      >
        <div
          v-if="isTileSelected(tile.number)"
          class="position-absolute top-0 end-0"
        >
          <font-awesome-icon :icon="['fas', 'check-circle']" />
        </div>
        <img
          :src="tile.src_thumbnail"
          alt="picture"
          width="75px"
          class="thumbnail"
          :class="isTileSelected(tile.number) ? 'thumbnail-selected' : ''"
        />
        <div
          class="thumbnail-footer position-absolute bottom-0 text-dark fw-bold w-100"
        >
          {{ tile.title }}
        </div>
      </div>
    </div>
    <div class="p-4">
      <div v-if="state == 'image-selection'" class="d-flex">
        <div>
          {{ selected_tiles.length }}
          {{ selected_tiles.length == 1 ? "Bild" : "Bilder" }} ausgewählt
        </div>
        <div>
          <button type="button" class="btn btn-primary">Weiter</button>
        </div>
      </div>
      <div v-if="state == 'counted-colors'"></div>
    </div>
  </div>
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle } from "@fortawesome/pro-solid-svg-icons";

library.add(faCheckCircle);

export default {
  name: "Tools",
  data() {
    return {
      tiles: [],
      // "image-selection" or "counted-colors"
      state: "image-selection",
      selected_tiles: [],
    };
  },
  methods: {
    getTileThumbnail(number) {
      return require("./../../assets/images/templates/" + number + ".webp");
    },
    getTile(number) {
      return require("./../../assets/images/templates/" +
        number +
        "-detailed.webp");
    },
    getTileCoordinates(number) {
      let x = number % 20;
      let y = Math.floor(number / 20);
      return [x, y];
    },
    getTileTitle(number) {
      let coordinates = this.getTileCoordinates(number);
      let short = number + " (" + coordinates[0] + "|" + coordinates[1] + ")";
      return short;
    },
    toggleTileSelection(number) {
      let index = this.selected_tiles.indexOf(number);
      if (index >= 0) {
        this.selected_tiles.splice(index, 1);
      } else {
        this.selected_tiles.push(number);
      }
    },
  },
  computed: {
    isTileSelected(number) {
      return this.selected_tiles.includes(number);
    },
  },
  created() {
    this.tiles = [];
    for (let index = 0; index < 500; index++) {
      let tile = {
        src_thumbnail: this.getTileThumbnail(index),
        src: this.getTile(index),
        w: 5000,
        h: 4000,
        title: this.getTileTitle(index),
        number: index,
      };
      this.tiles.push(tile);
    }
  },
};
</script>
<style lang="scss" scoped>
.thumbnail {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

.thumbnail-selected {
  filter: opacity(0.75);
}

.thumbnail-footer {
  padding: 0.1rem;
  font-family: arial;
  font-size: small;
  background: rgba(255, 255, 255, 0.9);
}
</style>