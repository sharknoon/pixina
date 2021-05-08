<template>
  <button @click="download()" class="btn btn-dark">
    <font-awesome-icon :icon="['fal', 'arrow-to-bottom']" size="lg" />
  </button>
</template>
<script>
export default {
  name: "DownloadButton",
  props: {
    tileNumber: {
      type: Number,
      required: true,
    },
  },
  methods: {
    download() {
      const url = require("@/assets/images/templates/" +
        this.tileNumber +
        "-detailed.webp");
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "tile_" + this.tileNumber;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  },
};
</script>