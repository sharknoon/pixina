<template>
  <div class="list-wrapper h-100 d-flex flex-column">
    <div class="d-flex flex-wrap p-2">
      <div v-for="tile in tiles" :key="tile" class="position-relative m-2" @click="openTile(tile)">
        <TileThumbnail :number="tile">
          <template #bottom-end>
            <div class="favorite-button" @click.stop="toggleTileFavorite(tile)">
              <svg v-if="store.favoriteTiles.includes(tile)" xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </template>
        </TileThumbnail>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useFavoriteTilesStore } from "@/stores/favorite-tiles";
import TileThumbnail from "@/components/common/TileThumbnail.vue";

const router = useRouter();
const store = useFavoriteTilesStore();

const props = defineProps({
  filter: {
    type: String,
    default: "all",
    validator(value: string) {
      return ["all", "favorites"].includes(value);
    },
  },
});

const tiles = computed(() => {
  if (props.filter === "favorites") {
    return store.favoriteTiles
      .concat() // basically copies the array
      .sort(function (tileA, tileB) {
        return tileA - tileB;
      });
  } else {
    let tiles = [];
    for (let number = 0; number < 500; number++) {
      tiles.push(number);
    }
    return tiles;
  }
});

function toggleTileFavorite(number: number) {
  store.toggleFavoriteTile(number);
}

function openTile(number: number) {
  router.push({
    name: "Template",
    params: { number: number },
  });
}
</script>
<style lang="scss" scoped>
.favorite-button {
  padding-right: 0.1rem;
}

.list-wrapper {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
