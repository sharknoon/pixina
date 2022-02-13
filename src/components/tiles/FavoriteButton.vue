<template>
  <button class="btn btn-dark" @click="toggleFavorite()">
    <font-awesome-icon :icon="[iconStyle, 'star']" size="lg" />
  </button>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useFavoriteTilesStore } from "@/stores/favorite-tiles";

const store = useFavoriteTilesStore();

const props = defineProps({
  tileNumber: {
    type: Number,
    required: true,
  },
});

const iconStyle = computed(() =>
  store.isFavorite(props.tileNumber) ? "fas" : "fal"
);

function toggleFavorite() {
  store.toggleFavoriteTile(props.tileNumber);
}
</script>
