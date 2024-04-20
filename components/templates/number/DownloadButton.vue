<template>
  <button class="btn btn-dark px-2" @click="download()">
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
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  </button>
</template>
<script setup lang="ts">
const props = defineProps({
  tileNumber: {
    type: Number,
    required: true,
  },
});

function download() {
  const url = `/images/templates/${props.tileNumber}-detailed.png`;

  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "tile_" + props.tileNumber;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
</script>
