<template>
  <div>
    <v-photoswipe-gallery
      class="p-2"
      :isOpen="isOpenGallery"
      :options="optionsGallery"
      :items="items"
    >
      <div class="thumbnail-container" slot-scope="props">
        <img
          :src="props.item.src_template"
          alt="picture"
          width="4.75rem"
        />
        <div class="thumbnail-footer">
          {{ getTemplateTitle(props.item.number, false) }}
        </div>
      </div>
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
      return require("./../../assets/images/templates/" + number + ".webp");
    },
    getDetailedTemplateUrl(number) {
      return require("./../../assets/images/templates/" + number + "-detailed.webp");
    },
    getCoordinates(number) {
      let x = number % 20;
      let y = Math.floor(number / 20);
      return [x, y];
    },
    getTemplateTitle(number, long = true) {
      let coordinates = this.getCoordinates(number);
      let short = number +
        " (" +
        coordinates[0] +
        "|" +
        coordinates[1] +
        ")";
        if (long) {
          return "Bild Nr. " + short;
        }else{
          return short;
        }
    },
  },
  created() {
    this.items = [];
    for (let index = 0; index < 500; index++) {
      let item = {
        src_template: this.getTemplateUrl(index),
        src: this.getDetailedTemplateUrl(index),
        w: 5000,
        h: 4000,
        title: this.getTemplateTitle(index),
        number: index
      };
      this.items.push(item);
    }
  },
};
</script>
<style lang=scss>
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
  text-align: center !important;
}
.pswp-thumbnail {
  .thumbnail-container {
    position: relative;
    margin: 0.5rem;
  }

  .thumbnail-footer {
    position: absolute; /* Position the background text */
    bottom: 0; /* At the bottom. Use top:0 to append it to the top */
    /* Black background with 0.5 opacity */
    background: rgba(255, 255, 255, 0.8);
    width: 100%; /* Full width */
    padding: 0.1rem; /* Some padding */
    color: black;
    font-size: small;
    font-family: arial;
    font-weight: bold;
  }
}
</style>
