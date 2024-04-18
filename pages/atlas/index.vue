<script setup lang="ts">
definePageMeta({
  name: "atlas",
});
</script>
<template>
  <iframe
    class="d-block w-100 h-100 border-0 position-relative"
    style="touch-action: none"
    src="./place-atlas/web/index.html"
  />
</template>
<style scoped lang="scss">
iframe {
  z-index: 1;
}
</style>
