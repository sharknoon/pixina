<template>
  <div class="h-100">
    <div class="h-100 overflow-auto p-4">
      <v-photoswipe-gallery
        :isOpen="isOpenGallery"
        :options="optionsGallery"
        :items="items"
      >
        <img
          slot-scope="props"
          :src="props.item.src"
          alt="picture"
          class="p-2"
        />
      </v-photoswipe-gallery>
    </div>
    <v-photoswipe
      :isOpen="isOpen"
      :items="items"
      :options="options"
      @close="hidePhotoSwipe"
    ></v-photoswipe>
  </div>
</template>
<script>
import { PhotoSwipe, PhotoSwipeGallery } from "v-photoswipe";
export default {
  components: {
    "v-photoswipe": PhotoSwipe,
    "v-photoswipe-gallery": PhotoSwipeGallery,
  },
  name: "Templates",
  data() {
    return {
      isOpen: false,
      isOpenGallery: false,
      options: {
        index: 0,
      },
      optionsGallery: {},
      items: [],
    };
  },
  methods: {
    showPhotoSwipe(index) {
      this.isOpen = true;
      this.$set(this.options, "index", index);
    },
    hidePhotoSwipe() {
      this.isOpen = false;
    },
    getTemplateUrl(number) {
      return require("./../../assets/templates/" + number + ".png");
    },
    pad(num, size) {
      var s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    },
  },
  created() {
    this.items = [];
    for (let index = 0; index < 500; index++) {
      let item = {
        src: this.getTemplateUrl(index),
        w: 5000,
        h: 4000,
        title: "Bild Nr. " + index,
      };
      this.items.push(item);
    }
  },
};
</script>
<style>
.pswp__img {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}
html {
  overflow: hidden;
}
</style>