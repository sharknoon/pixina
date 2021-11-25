<template>
  <div id="history-wrapper" class="h-100 d-flex flex-column">
    <Zoom class="flex-grow-1" :src="items[current_item].src"></Zoom>
    <input type="range" class="form-range p-4" :max="items.length - 1" v-model="current_item" />
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import Zoom from "@/components/common/Zoom";

const items = ref([{ src: "" }]);
const current_item = ref(0);

onMounted(() => {
  items.value = [];
  for (let index = 0; index < 99; index++) {
    let image = new Image();
    image.src = getItemUrl(index);
    items.value.push(image);
  }
});

function getItemUrl(number) {
  return require("@/assets/images/history/" + number + ".webp");
}
</script>