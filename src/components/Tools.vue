<template>
  <div id="tools-wrapper" class="h-100 d-flex flex-column">
    <div
      v-if="state == 'image-selection'"
      class="d-flex flex-wrap justify-content-evenly p-2 overflow-auto"
    >
      <div
        v-for="tile in tiles"
        :key="tile.number"
        class="position-relative m-2"
        @click="toggleTileSelection($event, tile.number)"
      >
        <img
          :src="tile.src_thumbnail"
          alt="picture"
          width="75px"
          class="thumbnail"
          :class="
            selected_tiles.includes(tile.number) ? 'thumbnail-selected' : ''
          "
        />
        <div
          v-if="selected_tiles.includes(tile.number)"
          class="position-absolute top-0 end-0 p-1"
        >
          <font-awesome-icon :icon="['fas', 'check-circle']" size="lg" />
        </div>
        <div
          class="thumbnail-footer position-absolute bottom-0 text-dark fw-bold w-100"
        >
          {{ tile.title }}
        </div>
      </div>
    </div>
    <div v-else-if="state == 'counted-colors'" class="flex-grow-1">
      <div
        v-for="color in colors"
        :key="color.number"
        class="card position-relative"
      >
        <div class="row g-0">
          <div class="col-3" :style="'background: ' + color.rgb"></div>
          <div class="col-9">
            <div class="card-body">
              <h5 class="card-title">{{ color.name }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ color.number }}</h6>
              <p class="card-text">
                <font-awesome-icon :icon="['fas', 'cubes']"></font-awesome-icon>
                {{ color.amount }}
              </p>
              <p class="card-text">
                <font-awesome-icon :icon="['fas', 'th']"></font-awesome-icon>
                {{ Math.floor(color.amount / 140) }} Farbquadrate +
                {{ color.amount % 140 }} Pixel
              </p>
              <a
                href="#"
                class="btn btn-light position-absolute top-0 end-0 p-2"
              >
                <font-awesome-icon :icon="['far', 'info-circle']">
                </font-awesome-icon>
              </a>
              <a href="#" class="btn btn-light">
                <font-awesome-icon :icon="['fas', 'cut']"></font-awesome-icon>
                Zuschneiden
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4">
      <div
        v-if="state == 'image-selection'"
        class="d-flex align-items-center justify-content-between"
      >
        <div>
          {{ selected_tiles.length }}
          {{ selected_tiles.length == 1 ? "Bild" : "Bilder" }} ausgewählt
        </div>
        <div>
          <button
            type="button"
            class="btn btn-primary"
            @click="countColors()"
            :disabled="selected_tiles.length < 1"
          >
            Weiter
          </button>
        </div>
      </div>
      <div
        v-else-if="state == 'counted-colors'"
        class="d-flex align-items-center justify-content-between"
      >
        <div>X von 16 Farben</div>
        <button type="button" class="btn btn-primary" @click="selectImages()">
          Fertig
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle } from "@fortawesome/pro-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/pro-regular-svg-icons";
import { faCut } from "@fortawesome/pro-solid-svg-icons";
import { faCubes } from "@fortawesome/pro-solid-svg-icons";
import { faTh } from "@fortawesome/pro-solid-svg-icons";

library.add(faCheckCircle, faInfoCircle, faCut, faCubes, faTh);

export default {
  name: "Tools",
  data() {
    return {
      tiles: [],
      // "image-selection" or "counted-colors"
      state: "image-selection",
      selected_tiles: [],
      colors = []
    };
  },
  methods: {
    getTileThumbnail(number) {
      return require("./../assets/images/templates/" + number + ".webp");
    },
    getTile(number) {
      return require("./../assets/images/templates/" +
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
    toggleTileSelection(event, number) {
      let fromNumber = number; // inclusive
      let toNumber = number; // inclusive

      if (event.shiftKey) {
        let last_selected_tile = this.selected_tiles[
          this.selected_tiles.length - 1
        ];
        if (last_selected_tile < number) {
          fromNumber = last_selected_tile + 1;
          toNumber = number;
        } else {
          fromNumber = number;
          toNumber = last_selected_tile - 1;
        }
      }

      for (let number = fromNumber; number <= toNumber; number++) {
        let index = this.selected_tiles.indexOf(number);
        if (index >= 0) {
          this.selected_tiles.splice(index, 1);
        } else {
          this.selected_tiles.push(number);
        }
      }
    },
    countColors() {
      this.colors = []
      this.state = "counted-colors";
      this.colors.push({
        amount: 1203,
        name: "Pink",
        number: 103,
        rgb: "#e7c0c3",
        rgb_place: "ffa7d1"
      });
    },
    selectImages() {
      this.selectImages = []
      this.state = "image-selection";
    }
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
#tools-wrapper {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.thumbnail {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  user-drag: none;
  -webkit-user-drag: none;
}

.thumbnail-selected {
  filter: opacity(0.25);
}

.thumbnail-footer {
  padding: 0.1rem;
  font-family: arial;
  font-size: small;
  background: rgba(255, 255, 255, 0.9);
}
</style>
