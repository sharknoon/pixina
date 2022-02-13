<template>
  <button class="btn btn-dark" @click="print()">
    <font-awesome-icon :icon="['fal', 'print']" size="lg" />
  </button>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import printJS from "print-js";

const { t } = useI18n();

const props = defineProps({
  tileNumber: {
    type: Number,
    required: true,
  },
});

function print() {
  printJS({
    printable: new URL(
      `../../assets/images/templates/${props.tileNumber}-detailed.webp`,
      import.meta.url
    ).href,
    type: "image",
    header: t("tile-title", {
      number: props.tileNumber,
      x: props.tileNumber % 20,
      y: Math.floor(props.tileNumber / 20),
    }),
    headerStyle: "font-family: Arial;",
    style: "@page { size: auto;  margin: 0mm; } html { margin: 10% }",
  });
}
</script>
