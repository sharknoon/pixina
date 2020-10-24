<template>
  <div id="history-wrapper" class="h-100 d-flex flex-column">
    <v-progress-circular :value="items.length"></v-progress-circular>
    <pinch-zoom 
    limitZoom="10"
    backgroundColor="white"
    style="flex: 0 1 auto">
      <img :src="items[current_item].src" />
    </pinch-zoom>
    <input
      type="range"
      class="custom-range p-4"
      :max="items.length - 1"
      v-model="current_item"
    />
  </div>
</template>
<script>
import Vue from "vue";
import PinchZoom from "vue-pinch-zoom";

Vue.component("pinch-zoom", PinchZoom);

export default {
  name: "History",
  data() {
    return {
      items: [],
      current_item: 0,
    };
  },
  methods: {
    getItemUrl(number) {
      return require("./../../assets/images/history/" + number + ".webp");
    },
  },
  mounted() {
    for (let index = 0; index < 100; index++) {
      let image = new Image();
      image.src = this.getItemUrl(index);
      this.items.push(image);
    }
  },
};
</script>
<style lang="scss" scoped>
#history-wrapper {

  img {
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }

  input {

  }
}
</style>