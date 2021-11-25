<template>
  <div class="position-fixed top-0 end-0 bottom-0 start-0">
    <div class="d-flex flex-column h-100 bg-dark position-relative">
      <div class="text-light d-flex justify-content-end p-2">
        <ShareButton :tileNumber="number" class="ms-2" />
        <DownloadButton :tileNumber="number" class="ms-2" />
        <InfoButton :tileNumber="number" class="ms-2" />
        <FavoriteButton :tileNumber="number" class="ms-2" />
        <PrintButton :tileNumber="number" class="ms-2" />
        <CloseButton class="ms-2" />
      </div>
      <Zoom class="flex-grow-1" :src="src"></Zoom>
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
<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import Zoom from "@/components/common/Zoom";
import ShareButton from "@/components/tiles/ShareButton";
import DownloadButton from "@/components/tiles/DownloadButton";
import InfoButton from "@/components/tiles/InfoButton";
import FavoriteButton from "@/components/tiles/FavoriteButton";
import PrintButton from "@/components/tiles/PrintButton";
import CloseButton from "@/components/tiles/CloseButton";
import PrevNextButton from "@/components/tiles/PrevNextButton";

const i18n = useI18n();
const route = useRoute();

const number = computed(() => parseInt(route.params.number));
const title = computed(() =>
  i18n.t("tile-title", {
    number: number.value,
    x: number.value % 20,
    y: Math.floor(number.value / 20),
  })
);
const src = computed(() =>
  require("@/assets/images/templates/" + number.value + "-detailed.webp")
);
</script>
