<template>
  <div id="history-wrapper" class="h-100 d-flex flex-column">
    <pinch-zoom 
    limitZoom="15"
    backgroundColor="white"
    disableZoomControl="disable"
    class="h-100 flex-grow-1">
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
export default {
  name: "History",
  data() {
    return {
      items: [{src:''}],
      current_item: 0,
    };
  },
  components: {
    PinchZoom: () => import('vue-pinch-zoom')
  },
  methods: {
    getItemUrl(number) {
      return require("./../../assets/images/history/" + number + ".webp");
    },
  },
  mounted() {
    this.items = [];
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

}
</style>