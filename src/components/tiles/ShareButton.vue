<template>
  <button v-if="webShareApiSupported()" @click="share()" class="btn btn-dark">
    <font-awesome-icon :icon="['fal', 'share-alt']" size="lg" />
  </button>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n();

const props = defineProps({
  tileNumber: {
    type: Number,
    required: true,
  },
});

let filesArray = ref([]);

onMounted(() => {
  fetch(
    require("@/assets/images/templates/" + props.tileNumber + "-detailed.webp")
  )
    .then((res) => res.blob())
    .then((blob) => {
      const file = new File([blob], "tile_" + props.tileNumber + ".webp", {
        type: blob.type,
      });
      filesArray.value = [file];
    });
});

function webShareApiSupported() {
  return navigator.share && navigator.canShare({ files: filesArray.value });
}

function share() {
  if (webShareApiSupported()) {
    navigator.share({
      files: filesArray.value,
      title: i18n.t("tile-title", {
        number: props.tileNumber,
        x: props.tileNumber % 20,
        y: Math.floor(props.tileNumber / 20),
      }),
      text: i18n.t("share-description"),
      url: window.location.href,
    });
  }
}
</script>
