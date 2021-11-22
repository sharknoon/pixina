<template>
  <div id="history-wrapper" class="h-100 d-flex flex-column">
    <Zoom class="flex-grow-1" :src="items[current_item].src"></Zoom>
    <input
      type="range"
      class="form-range p-4"
      :max="items.length - 1"
      v-model="current_item"
    />
  </div>
</template>
<script>
import Zoom from "@/components/common/Zoom";

export default {
  name: "History",
  data() {
    return {
      items: [{ src: "" }],
      current_item: 0,
    };
  },
  components: {
    Zoom,
  },
  methods: {
    getItemUrl(number) {
      return require("@/assets/images/history/" + number + ".webp");
    },
  },
  mounted() {
    this.items = [];
    for (let index = 0; index < 99; index++) {
      let image = new Image();
      image.src = this.getItemUrl(index);
      this.items.push(image);
    }
  },
};
</script>
