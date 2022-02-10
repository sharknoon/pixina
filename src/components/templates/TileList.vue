<template>
  <div class="list-wrapper h-100 d-flex flex-column">
    <div
      class="d-flex flex-wrap p-2 overflow-auto"
      :class="tiles.length > 3 ? 'justify-content-evenly' : ''"
    >
      <div
        v-for="tile in tiles"
        :key="tile"
        class="position-relative m-2"
        @click="openTile(tile)"
      >
        <TileThumbnail :number="tile" />
        <div
          class="position-absolute top-0 end-0 p-1"
          @click.stop="toggleTileFavorite(tile)"
        >
          <font-awesome-icon
            :icon="[
              store.favoriteTiles.includes(tile)
                ? 'fas'
                : 'far',
              'star',
            ]"
            style="color: orange"
            size="lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/js/pinia";
import TileThumbnail from "@/components/common/TileThumbnail";

const router = useRouter();
const store = useStore();

const props = defineProps({
  filter: {
    type: String,
    default: "all",
    validator(value) {
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
})

function toggleTileFavorite(number) {
  store.toggleFavoriteTile(number);
}

function openTile(number) {
  router.push({
    name: "Template",
    params: { number: number },
  });
}
</script>
<style lang="scss" scoped>
.list-wrapper {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>