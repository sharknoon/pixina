<template>
  <button class="btn btn-dark" @click="showColors()">
    <font-awesome-icon :icon="['fal', 'palette']" size="lg" />
  </button>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  tileNumber: {
    type: Number,
    required: true,
  },
});

function showColors() {
  router.push({
    name: "ColorCount",
    query: { tiles: [props.tileNumber] },
  });
}
</script>
