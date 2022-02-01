<template>
  <div class="position-relative">
    <img
      :id="'thumbnail-' + tile.number"
      :src="tile.thumbnail"
      alt="picture"
      width="75"
      class="img-pixelated"
    >
    <div
      class="thumbnail-footer position-absolute bottom-0 text-dark fw-bold w-100"
    >
      {{ tile.title }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
    number: {
        type: Number,
        required: true,
    }
});

const tile = {
    number: props.number,
    thumbnail: require("@/assets/images/templates/" + props.number + ".webp"),
    title: `${props.number} (${props.number % 20}|${Math.floor(props.number / 20)})`,
};
</script>
<style lang="scss" scoped>
.thumbnail-footer {
    padding: 0.1rem;
    font-family: arial;
    font-size: small;
    background: rgba(255, 255, 255, 0.9);
}
</style>