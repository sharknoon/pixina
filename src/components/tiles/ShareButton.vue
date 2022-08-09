<template>
  <button v-if="webShareApiSupported()" class="btn btn-dark" @click="share()">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style="height: 1.5rem; width: 1.5rem"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
      />
    </svg>
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
  fetch(
    new URL(
      `../../assets/images/templates/${props.tileNumber}-detailed.webp`,
      import.meta.url
    ).href
  )
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
