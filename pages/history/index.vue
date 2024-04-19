<template>
  <div id="history-wrapper" class="h-100 d-flex flex-column">
    <CommonZoomWrapper class="flex-grow-1" :src="currentItemSrc" />
    <input
      v-model="currentItem"
      type="range"
      class="form-range p-4"
      :max="items.length - 1"
    />
  </div>
</template>
<script setup lang="ts">
const items: Ref<HTMLImageElement[]> = ref([]);
const currentItem: Ref<number> = ref(0);
const currentItemSrc = computed(
  () => items.value[currentItem.value]?.src || "",
);

onMounted(() => {
  items.value = [];
  for (let index = 0; index < 99; index++) {
    const image: HTMLImageElement = new Image();
    image.src = `/images/history/${index}.webp`;
    items.value.push(image);
  }
});
</script>
