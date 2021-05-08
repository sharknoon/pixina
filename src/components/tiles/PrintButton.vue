<template>
  <button @click="print()" class="btn btn-dark">
    <font-awesome-icon :icon="['fal', 'print']" size="lg" />
  </button>
</template>
<script>
import printJS from "print-js";

export default {
  name: "PrintButton",
  props: {
    tileNumber: {
      type: Number,
      required: true,
    },
  },
  methods: {
    print() {
      printJS({
        printable: require("@/assets/images/templates/" +
          this.tileNumber +
          "-detailed.webp"),
        type: "image",
        header: this.$t("tile-title", {
          number: this.number,
          x: this.number % 20,
          y: Math.floor(this.number / 20),
        }),
        headerStyle: "font-family: Arial;",
        style: "@page { size: auto;  margin: 0mm; } html { margin: 10% }",
      });
    },
  },
};
</script>