<template>
  <button
    class="btn btn-dark"
    @click="showInfo()"
  >
    <font-awesome-icon
      :icon="['fal', 'info-circle']"
      size="lg"
    />
  </button>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  tileNumber: {
    type: Number,
    required: true,
  },
});

function showInfo() {
  router.push({
    name: "ColorCountTile",
    query: { tiles: [props.tileNumber] },
  });
}
</script>
