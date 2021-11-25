<template>
  <button
    class="btn btn-dark"
    @click="toggleFavorite()"
  >
    <font-awesome-icon
      :icon="[iconStyle, 'star']"
      size="lg"
    />
  </button>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  tileNumber: {
    type: Number,
    required: true,
  },
});

const iconStyle = computed(() =>
  store.getters.isFavorite(props.tileNumber) ? "fas" : "fal"
);

function toggleFavorite() {
  store.commit("toggleFavoriteTile", props.tileNumber);
}
</script>
