<template>
  <button v-if="webShareApiSupported()" class="btn btn-dark" @click="share()">
    <font-awesome-icon :icon="['fal', 'share-alt']" size="lg" />
  </button>
</template>
<script setup lang="ts">
import type { Ref } from "vue";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  tileNumber: {
    type: Number,
    required: true,
  },
});

let filesArray: Ref<File[]> = ref([]);

onMounted(() => {
  fetch(new URL(`../../assets/images/templates/${props.tileNumber}-detailed.webp`, import.meta.url).href)
    .then((res: Response) => res.blob())
    .then((blob: Blob) => {
      const file: File = new File([blob], `tile_${props.tileNumber}.webp`, {
        type: blob.type,
      });
      filesArray.value = [file];
    });
});

function webShareApiSupported() {
  if (!navigator.canShare) {
    return false;
  }
  return navigator.canShare({ files: filesArray.value });
}

function share() {
  if (webShareApiSupported()) {
    navigator.share({
      files: filesArray.value,
      title: t("tile-title", {
        number: props.tileNumber,
        x: props.tileNumber % 20,
        y: Math.floor(props.tileNumber / 20),
      }),
      text: t("share-description"),
      url: window.location.href,
    });
  }
}
</script>
