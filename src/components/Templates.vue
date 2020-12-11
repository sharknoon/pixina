<template>
  <div>
    <v-photoswipe-gallery
      class="p-2"
      :isOpen="isOpenGallery"
      :options="optionsGallery"
      :items="tiles"
    >
      <div class="thumbnail-container" slot-scope="props">
        <img :src="props.item.src_thumbnail" alt="picture" width="75px" />
        <div class="thumbnail-footer">
          {{ getTileTitle(props.item.number, false) }}
        </div>
      </div>
    </v-photoswipe-gallery>
    <v-photoswipe
      :isOpen="isOpen"
      :items="tiles"
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
      optionsGallery: {
        counterEl: false,
        arrowEl: false,
        loop: false,
      },
      tiles: [],
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
    getTileThumbnail(number) {
      return require("./../assets/images/templates/" + number + ".webp");
    },
    getTile(number) {
      return require("./../assets/images/templates/" +
        number +
        "-detailed.webp");
    },
    getTileCoordinates(number) {
      let x = number % 20;
      let y = Math.floor(number / 20);
      return [x, y];
    },
    getTileTitle(number, long = true) {
      let coordinates = this.getTileCoordinates(number);
      let short = number + " (" + coordinates[0] + "|" + coordinates[1] + ")";
      if (long) {
        return "Bild Nr. " + short;
      } else {
        return short;
      }
    },
  },
  created() {
    this.tiles = [];
    for (let index = 0; index < 500; index++) {
      let tile = {
        src_thumbnail: this.getTileThumbnail(index),
        src: this.getTile(index),
        w: 5000,
        h: 4000,
        title: this.getTileTitle(index),
        number: index,
      };
      this.tiles.push(tile);
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
    position: absolute;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    width: 100%;
    padding: 0.1rem;
    color: black;
    font-size: small;
    font-family: arial;
    font-weight: bold;
  }
}
</style>
