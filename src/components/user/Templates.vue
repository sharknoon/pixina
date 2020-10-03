<template>
  <div>
    <v-photoswipe-gallery
      class="p-2"
      :isOpen="isOpenGallery"
      :options="optionsGallery"
      :items="items"
    >
      <img
        slot-scope="props"
        :src="props.item.src_template"
        alt="picture"
        class="p-2"
        height="75px"
      />
    </v-photoswipe-gallery>
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
        index: 0
      },
      optionsGallery: {
        counterEl: false,
        arrowEl: false,
        loop: false
      },
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
    getDetailedTemplateUrl(number) {
      return require("./../../assets/templates/" + number + "-detailed.png");
    },
    getCoordinates(number) {
      let x = number % 20
      let y = Math.floor(number / 20)
      return [x,y]
    }
  },
  created() {
    this.items = [];
    for (let index = 0; index < 500; index++) {
      let coordinates = this.getCoordinates(index)
      let item = {
        src_template: this.getTemplateUrl(index),
        src: this.getDetailedTemplateUrl(index),
        w: 5000,
        h: 4000,
        title: "Bild Nr. " + index + " (" + coordinates[0] + "|" + coordinates[1] + ")",
      };
      this.items.push(item);
    }
  },
};
</script>
<style>
.pswp-thumbnails {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.pswp__img,
.pswp-thumbnail {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}
.pswp__caption__center {
  text-align: center;
}
html {
  overflow: hidden;
}
</style>