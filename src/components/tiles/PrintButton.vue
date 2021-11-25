<template>
  <button @click="print()" class="btn btn-dark">
    <font-awesome-icon :icon="['fal', 'print']" size="lg" />
  </button>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import printJS from "print-js";

const i18n = useI18n();

const props = defineProps({
  tileNumber: {
    type: Number,
    required: true,
  },
});

function print() {
  printJS({
    printable: require("@/assets/images/templates/" +
      props.tileNumber +
      "-detailed.webp"),
    type: "image",
    header: i18n.t("tile-title", {
      number: props.tileNumber,
      x: props.tileNumber % 20,
      y: Math.floor(props.tileNumber / 20),
    }),
    headerStyle: "font-family: Arial;",
    style: "@page { size: auto;  margin: 0mm; } html { margin: 10% }",
  });
}
</script>
