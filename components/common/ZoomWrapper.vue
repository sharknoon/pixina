<template>
  <div class="position-relative overflow-hidden">
    <div
      class="position-absolute end-0 bottom-0 m-4 btn-group-vertical"
      style="z-index: 1"
    >
      <button
        type="button"
        class="btn text-white px-2"
        @click="currentZoom?.zoomIn()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style="height: 1.5rem; width: 1.5rem"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="6"
            stroke="#212529"
            d="M12 4v16m8-8H4"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      <button
        type="button"
        class="btn text-white px-2"
        @click="currentZoom?.zoomOut()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style="height: 1.5rem; width: 1.5rem"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="6"
            stroke="#212529"
            d="M20 12H4"
          />
          <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
        </svg>
      </button>
    </div>
    <img
      ref="zoom-element"
      :src="src"
      class="img-pixelated mw-100 mh-100 position-absolute top-0 end-0 bottom-0 start-0 m-auto"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import Zoom from "~/utils/zoom";

defineProps({
  src: {
    type: String,
    required: true,
  },
});

const zoomElement = useTemplateRef("zoom-element");

const currentZoom = ref<Zoom>();

onMounted(() => {
  if (zoomElement.value) {
    currentZoom.value = new Zoom(zoomElement.value);
  }
});
</script>
