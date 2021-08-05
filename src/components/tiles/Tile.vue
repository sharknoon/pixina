<template>
  <div class="position-fixed top-0 end-0 bottom-0 start-0">
    <div class="d-flex flex-column h-100 bg-dark position-relative">
      <div class="text-light d-flex justify-content-end p-2">
        <ShareButton :tileNumber="number" class="ms-2" />
        <DownloadButton :tileNumber="number" class="ms-2" />
        <InfoButton :tileNumber="number" class="ms-2" />
        <FavoriteButton :tileNumber="number" class="ms-2" />
        <PrintButton :tileNumber="number" class="ms-2" />
        <CloseButton :route="{ name: 'Templates' }" class="ms-2" />
      </div>
      <pinch-zoom
        limitZoom="15"
        disableZoomControl="disable"
        class="flex-grow-1 h-100 bg-transparent"
      >
        <img :src="src" class="img-pixelated" />
      </pinch-zoom>
      <div class="text-light p-2 text-center">
        {{ title }}
      </div>
      <PrevNextButton
        type="prev"
        class="position-absolute top-50 start-0 translate-middle-y"
      />
      <PrevNextButton
        type="next"
        class="position-absolute top-50 end-0 translate-middle-y"
      />
    </div>
  </div>
</template>
<script>
import ShareButton from "./ShareButton";
import DownloadButton from "./DownloadButton";
import InfoButton from "./InfoButton";
import FavoriteButton from "./FavoriteButton";
import PrintButton from "./PrintButton";
import CloseButton from "./CloseButton";
import PrevNextButton from "./PrevNextButton";

export default {
  name: "Tile",
  components: {
    PinchZoom: () => import("vue-pinch-zoom"),
    ShareButton,
    DownloadButton,
    InfoButton,
    FavoriteButton,
    PrintButton,
    CloseButton,
    PrevNextButton,
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
  },
};
</script>