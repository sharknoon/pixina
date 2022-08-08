<template>
  <button class="btn btn-dark" @click="download()">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
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
  const url = new URL(
    `../../assets/images/templates/${props.tileNumber}-detailed.png`,
    import.meta.url
  ).href;
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "tile_" + props.tileNumber;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
</script>
