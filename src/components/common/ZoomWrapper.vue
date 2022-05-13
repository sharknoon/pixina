<template>
  <div class="position-relative overflow-hidden" style="touch-action: none">
    <div
      class="position-absolute end-0 bottom-0 m-4 btn-group-vertical"
      style="z-index: 1"
    >
      <button type="button" class="btn btn-secondary" @click="zoomIn()">
        <font-awesome-icon :icon="['far', 'plus']" />
      </button>
      <button type="button" class="btn btn-secondary" @click="zoomOut()">
        <font-awesome-icon :icon="['far', 'minus']" />
      </button>
    </div>
    <img
      id="zoom-img"
      :src="src"
      class="img-pixelated mw-100 mh-100 position-absolute top-0 end-0 bottom-0 start-0 m-auto"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import Zoom from "@/zoom";

defineProps({
  src: {
    type: String,
    required: true,
  },
});

const zoom = ref();

onMounted(() => {
  const zoomImg = document.getElementById("zoom-img");
  if (zoomImg instanceof HTMLImageElement) zoom.value = new Zoom(zoomImg);
});

function zoomIn() {
  if (zoom.value) zoom.value.zoom(1);
}

function zoomOut() {
  if (zoom.value) zoom.value.zoom(-1);
}
</script>
