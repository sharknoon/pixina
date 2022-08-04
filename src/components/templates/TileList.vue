<template>
  <div class="list-wrapper h-100 d-flex flex-column">
    <div class="d-flex flex-wrap p-2">
      <div
        v-for="tile in tiles"
        :key="tile"
        ref="thumbnails"
        class="position-relative m-2"
        @click="openTile(tile)"
      >
        <TileThumbnail :number="tile">
          <template #bottom-end>
            <div class="favorite-button" @click.stop="toggleTileFavorite(tile)">
              <font-awesome-icon
                :icon="[
                  store.favoriteTiles.includes(tile) ? 'fas' : 'far',
                  'star',
                ]"
                style="color: orange"
                size="lg"
              />
            </div>
          </template>
        </TileThumbnail>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
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

const observer = new IntersectionObserver((entries, self) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target.getElementsByTagName("img")[0];
      img?.setAttribute("src", img?.getAttribute("data-src") || "");
      self.unobserve(entry.target);
    }
  });
});
const thumbnails = ref<HTMLElement[]>([]);

onMounted(() => {
  thumbnails.value.forEach((thumbnail) =>
    thumbnail ? observer.observe(thumbnail) : null
  );
});
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
