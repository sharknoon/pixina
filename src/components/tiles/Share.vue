<template>
  <button @click="share()" class="btn btn-dark">
    <font-awesome-icon :icon="['fal', 'share-alt']" size="lg" />
  </button>
</template>
<script>
export default {
  name: "Share",
  props: {
    tileNumber: {
      type: Number,
      required: true,
    },
  },
  methods: {
    share() {
      fetch(
        require("./../../assets/images/templates/" +
          this.tileNumber +
          "-detailed.webp")
      )
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "tile_" + this.tileNumber + ".webp", {
            type: blob.type,
          });
          const filesArray = [file];
          if (navigator.canShare && navigator.canShare({ files: filesArray })) {
            navigator.share({
              files: filesArray,
              title:
                "Bild Nr. " +
                this.tileNumber +
                " (" +
                (this.tileNumber % 20) +
                "|" +
                Math.floor(this.tileNumber / 20) +
                ")",
              text:
                "Dieses Bild ist Teil von 500 Bildern, die ein 1000 x 1000 Pixel großes Kunstwerk (2,5m x 2,5m) ergeben werden.",
              url: window.location.href,
            });
          }
        });
    },
  },
};
</script>