<template>
  <div class="selection-wrapper h-100 d-flex flex-column">
    <div class="d-flex flex-wrap justify-content-start p-2 overflow-auto">
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
          :id="'thumbnail-' + tile.number"
          :class="
            selected_tiles_numbers.includes(tile.number)
              ? 'thumbnail-selected'
              : ''
          "
        />
        <div v-if="multiSelection">
          <div
            v-if="selected_tiles_numbers.includes(tile.number)"
            class="position-absolute top-0 end-0 p-1"
          >
            <font-awesome-icon :icon="['fas', 'check-circle']" size="lg" />
          </div>
        </div>
        <div v-else>
          <div
            class="position-absolute top-0 end-0 p-1"
            @click.stop="toggleTileFavorite(tile.number)"
          >
            <font-awesome-icon
              :icon="[
                $store.state.favoriteTiles.includes(tile.number)
                  ? 'fas'
                  : 'far',
                'star',
              ]"
              style="color: orange"
              size="lg"
            />
          </div>
        </div>
        <div
          class="thumbnail-footer position-absolute bottom-0 text-dark fw-bold w-100"
        >
          {{ tile.title }}
        </div>
      </div>
    </div>

    <div
      v-if="multiSelection"
      class="p-4 d-flex align-items-center justify-content-between"
    >
      <div>
        {{ selected_tiles.length }}
        {{ selected_tiles.length == 1 ? "Bild" : "Bilder" }} ausgewählt
      </div>
      <div>
        <button
          type="button"
          class="btn btn-primary"
          @click="
            $router.push({
              name: 'colorCountTools',
              query: { tiles: selected_tiles_numbers },
            })
          "
          :disabled="selected_tiles.length < 1"
        >
          Weiter
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faStar as fasStar,
} from "@fortawesome/pro-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/pro-regular-svg-icons";
library.add(faCheckCircle, fasStar, farStar);

export default {
  name: "TileSelection",
  data() {
    return {
      selected_tiles_numbers: [],
    };
  },
  computed: {
    tiles: function () {
      if (this.onlyFavorites) {
        return this.$store.state.favoriteTiles
          .map((number) => this.getTile(number))
          .sort(function (tileA, tileB) {
            return tileA.number - tileB.number;
          });
      } else {
        let tiles = [];
        for (let number = 0; number < 500; number++) {
          tiles.push(this.getTile(number));
        }
        return tiles;
      }
    },
    selected_tiles: function () {
      return this.selected_tiles_numbers.map((number) => this.tiles[number]);
    },
    favorite_tiles: function () {
      return this.$store.state.favoriteTiles.map((number) => this.tile[number]);
    },
  },
  props: {
    multiSelection: {
      type: Boolean,
      default: false,
    },
    withFavorites: {
      type: Boolean,
      default: false,
    },
    onlyFavorites: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleTileFavorite(number) {
      if (this.multiSelection) {
        return;
      }
      this.$store.commit("toggleFavoriteTile", number);
    },
    toggleTileSelection(event, number) {
      if (this.multiSelection) {
        let fromNumber = number; // inclusive
        let toNumber = number; // inclusive

        if (event.shiftKey) {
          let last_selected_tile = this.selected_tiles_numbers[
            this.selected_tiles_numbers.length - 1
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
          let index = this.selected_tiles_numbers.indexOf(number);
          if (index >= 0) {
            this.selected_tiles_numbers.splice(index, 1);
          } else {
            this.selected_tiles_numbers.push(number);
          }
        }
      } else {
        this.$router.push("/templates/" + number);
      }
    },
    getTile(number) {
      return {
        src_thumbnail: this.getTileThumbnail(number),
        src: this.getTileTemplate(number),
        title: this.getTileTitle(number),
        number: number,
      };
    },
    getTileThumbnail(number) {
      return require("./../../assets/images/templates/" + number + ".webp");
    },
    getTileTemplate(number) {
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
  },
};
</script>
<style lang="scss" scoped>
.selection-wrapper {
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