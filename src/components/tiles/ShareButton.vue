<template>
  <button v-if="webShareApiSupported()" @click="share()" class="btn btn-dark">
    <font-awesome-icon :icon="['fal', 'share-alt']" size="lg" />
  </button>
</template>
<script>
export default {
  name: "ShareButton",
  data() {
    return {
      filesArray: [],
    };
  },
  props: {
    tileNumber: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    fetch(
      require("@/assets/images/templates/" + this.tileNumber + "-detailed.webp")
    )
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "tile_" + this.tileNumber + ".webp", {
          type: blob.type,
        });
        this.filesArray = [file];
      });
  },
  methods: {
    webShareApiSupported() {
      return navigator.share && navigator.canShare({ files: this.filesArray });
    },
    share() {
      if (this.webShareApiSupported()) {
        navigator.share({
          files: this.filesArray,
          title: this.$t("tile-title", {
            number: this.tileNumber,
            x: this.tileNumber % 20,
            y: Math.floor(this.tileNumber / 20),
          }),
          text: this.$t("share-description"),
          url: window.location.href,
        });
      }
    },
  },
};
</script>