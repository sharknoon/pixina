<template>
  <div class="position-fixed top-0 end-0 bottom-0 start-0">
    <div class="d-flex flex-column h-100 bg-dark">
      <div class="text-light d-flex justify-content-end p-2">
        <Share v-if="webShareApiSupported" :tileNumber="number" />
        <Download :tileNumber="number"></Download>

        <button class="btn btn-dark" @click="showTileInfo()">
          <font-awesome-icon :icon="['fal', 'info-circle']" size="lg" />
        </button>

        <button class="btn btn-dark" @click="toggleTileFavorite()">
          <font-awesome-icon :icon="[favoriteButtonIcon, 'star']" size="lg" />
        </button>

        <button class="btn btn-dark" @click="printTile()">
          <font-awesome-icon :icon="['fal', 'print']" size="lg" />
        </button>

        <button class="btn btn-dark" @click="goBack()">
          <font-awesome-icon :icon="['fal', 'times']" size="lg" />
        </button>
      </div>
      <pinch-zoom
        limitZoom="15"
        disableZoomControl="disable"
        class="flex-grow-1 h-100 bg-transparent"
      >
        <img :src="src" class="tile" />
      </pinch-zoom>
      <div class="text-light p-2 text-center">
        {{ title }}
      </div>
    </div>
  </div>
</template>
<script>
import printJS from "print-js";
import Share from "./Share";
import Download from "./Download.vue";

export default {
  name: "Tile",
  components: {
    PinchZoom: () => import("vue-pinch-zoom"),
    Share,
    Download,
  },
  computed: {
    title() {
      return this.$t("tile-title", {
        number: this.number,
        x: this.number % 20,
        y: Math.floor(this.number / 20),
      });
    },
    src() {
      return require("@/assets/images/templates/" +
        this.number +
        "-detailed.webp");
    },
    number() {
      return parseInt(this.$route.params.number);
    },
    url() {
      return window.location.href;
    },
    webShareApiSupported() {
      return navigator.share;
    },
    favoriteButtonIcon() {
      return this.$store.getters.isFavorite(this.number) ? "fas" : "fal";
    },
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    printTile() {
      printJS({
        printable: this.src,
        type: "image",
        header: this.title,
        headerStyle: "font-family: Arial;",
        style: "@page { size: auto;  margin: 0mm; } html { margin: 10% }",
      });
    },
    toggleTileFavorite() {
      this.$store.commit("toggleFavoriteTile", this.number);
    },
    showTileInfo() {
      this.$router.push({
        name: "ColorCountTile",
        query: { tiles: [this.number] },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.tile {
  image-rendering: -moz-crisp-edges;
  image-rendering: pixelated;
}
</style>
<style lang="scss">
.bg-transparent {
  background-color: transparent;
}
</style>