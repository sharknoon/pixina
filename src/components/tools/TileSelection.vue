<template>
  <div class="selection-wrapper h-100 d-flex flex-column">
    <div
      class="d-flex flex-wrap p-2 overflow-auto"
      :class="tiles.length > 3 ? 'justify-content-evenly' : ''"
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
          width="75"
          class="img-pixelated"
          :id="'thumbnail-' + tile.number"
          :class="
            selected_tiles_numbers.includes(tile.number)
              ? 'thumbnail-selected'
              : ''
          "
        />
        <div v-if="multi">
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
        >{{ tile.title }}</div>
      </div>
    </div>

    <div v-if="multi" class="p-4 d-flex align-items-center justify-content-between">
      <div>
        {{
          $tc("tile-selection-counter", selected_tiles.length, {
            amount: selected_tiles.length,
          })
        }}
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
        >{{ $t("next") }}</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const props = defineProps({
  multi: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: String,
    default: "all",
    validator(value) {
      return ["all", "favorites"].includes(value);
    },
  },
});

const selected_tiles_numbers = ref([]);

const tiles = computed(() => {
  if (props.filter === "favorites") {
    return store.state.favoriteTiles
      .map((number) => getTile(number))
      .sort(function (tileA, tileB) {
        return tileA.number - tileB.number;
      });
  } else {
    let tiles = [];
    for (let number = 0; number < 500; number++) {
      tiles.push(getTile(number));
    }
    return tiles;
  }
})
const selected_tiles = computed(() => {
  return selected_tiles_numbers.value.map((number) => tiles.value[number]);
});

function toggleTileFavorite(number) {
  if (props.multi) {
    return;
  }
  store.commit("toggleFavoriteTile", number);
}

function toggleTileSelection(event, number) {
  if (props.multi) {
    let fromNumber = number; // inclusive
    let toNumber = number; // inclusive

    if (event.shiftKey) {
      let last_selected_tile =
        selected_tiles_numbers.value[selected_tiles_numbers.value.length - 1];
      if (last_selected_tile < number) {
        fromNumber = last_selected_tile + 1;
        toNumber = number;
      } else {
        fromNumber = number;
        toNumber = last_selected_tile - 1;
      }
    }

    for (let number = fromNumber; number <= toNumber; number++) {
      let index = selected_tiles_numbers.value.indexOf(number);
      if (index >= 0) {
        selected_tiles_numbers.value.splice(index, 1);
      } else {
        selected_tiles_numbers.value.push(number);
      }
    }
  } else {
    router.push("/templates/" + number);
  }
}

function getTile(number) {
  return {
    src_thumbnail: getTileThumbnail(number),
    src: getTileTemplate(number),
    title: getTileTitle(number),
    number: number,
  };
}
function getTileThumbnail(number) {
  return require("@/assets/images/templates/" + number + ".webp");
}
function getTileTemplate(number) {
  return require("@/assets/images/templates/" + number + "-detailed.webp");
}
function getTileCoordinates(number) {
  let x = number % 20;
  let y = Math.floor(number / 20);
  return [x, y];
}
function getTileTitle(number) {
  let coordinates = getTileCoordinates(number);
  let short = number + " (" + coordinates[0] + "|" + coordinates[1] + ")";
  return short;
}
</script>
<style lang="scss" scoped>
.selection-wrapper {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
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