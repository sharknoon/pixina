<template>
  <button class="btn btn-dark" @click="download()">
    <font-awesome-icon :icon="['fal', 'arrow-to-bottom']" size="lg" />
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
    `../../assets/images/templates/${props.tileNumber}-detailed.webp`,
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
