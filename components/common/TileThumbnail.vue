<template>
  <div class="tile-thumbnail position-relative shadow-sm rounded" style="--bs-aspect-ratio: 80%">
    <img
      :id="'thumbnail-' + tile?.number"
      :src="tile?.thumbnail"
      :alt="'tile-' + tile?.number"
      width="75"
      class="img-pixelated rounded"
    />
    <div class="position-absolute top-0 end-0 d-flex gap-1">
      <slot name="top-end"></slot>
    </div>
    <div class="thumbnail-footer position-absolute bottom-0 text-dark w-100 fw-bold rounded-bottom">
      {{ tile?.title }}
    </div>
    <div class="position-absolute bottom-0 end-0 d-flex gap-1">
      <slot name="bottom-end"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  number: {
    type: Number,
    required: true
  }
})

interface Tile {
  number: number
  thumbnail: string
  title: string
}

const tile: Tile = {
  number: props.number,
  thumbnail: `/images/templates/${props.number}.webp`,
  title: String(props.number)
}
</script>
<style lang="scss" scoped>
.thumbnail-footer {
  font-size: 0.9rem;
  padding: 0.1rem;
  font-family: arial;
  background: rgba(255, 255, 255, 0.9);
}
</style>
