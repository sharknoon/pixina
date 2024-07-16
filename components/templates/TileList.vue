<template>
  <div class="list-wrapper h-100 d-flex flex-column">
    <div class="d-flex flex-wrap p-2">
      <div
        v-for="tile in tiles"
        :key="tile"
        class="position-relative m-2"
        @click="openTile(tile)"
      >
        <CommonTileThumbnail :number="tile">
          <template #bottom-end>
            <div>
              <svg
                v-if="status === 'success' && data?.finished.includes(tile)"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-flag-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001"
                />
              </svg>
              <svg
                v-else-if="
                  status === 'success' && data?.inProgress.includes(tile)
                "
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-clock-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"
                />
              </svg>
              <svg
                v-else-if="
                  status === 'success' && data?.reserved.includes(tile)
                "
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-lock-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"
                />
              </svg>
            </div>
            <ClientOnly>
              <div
                class="favorite-button"
                @click.stop="toggleTileFavorite(tile)"
              >
                <svg
                  v-if="favoriteTileStore.favoriteTiles.includes(tile)"
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-warning"
                  style="height: 1.5rem; width: 1.5rem"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-warning"
                  style="height: 1.5rem; width: 1.5rem"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <template #fallback>
                <div class="favorite-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="text-warning"
                    style="height: 1.5rem; width: 1.5rem"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
              </template>
            </ClientOnly>
          </template>
        </CommonTileThumbnail>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Progress } from "~/types/progress";

const router = useRouter();
const favoriteTileStore = useFavoriteTilesStore();
const { status, data } = await useLazyFetch<Progress>("/api/v1/progress");

const props = defineProps({
  filter: {
    type: String,
    default: "all",
    validator(value: string) {
      return ["all", "favorites"].includes(value);
    },
  },
});

const tiles = ref<number[]>([]);
if (props.filter === "favorites") {
  onMounted(() => {
    watch(
      favoriteTileStore,
      () => {
        tiles.value = favoriteTileStore.favoriteTiles
          .concat() // basically copies the array
          .sort(function (tileA, tileB) {
            return tileA - tileB;
          });
      },
      { immediate: true },
    );
  });
} else {
  const newTiles = [];
  for (let number = 0; number < 500; number++) {
    newTiles.push(number);
  }
  tiles.value = newTiles;
}

function toggleTileFavorite(number: number) {
  favoriteTileStore.toggleFavoriteTile(number);
}

function openTile(number: number) {
  router.push("/templates/" + number);
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
