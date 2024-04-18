<template>
  <div class="position-fixed top-0 end-0 bottom-0 start-0">
    <div class="d-flex flex-column h-100 bg-dark position-relative">
      <div class="text-light d-flex justify-content-end p-2 gap-1">
        <ClientOnly>
          <TemplatesNumberFullscreenButton
            @fullscreen="(s) => (state.isFullscreen = s)"
          />
          <TemplatesNumberShareButton :tile-number="number" />
        </ClientOnly>
        <TemplatesNumberDownloadButton :tile-number="number" />
        <TemplatesNumberColorsButton :tile-number="number" />
        <TemplatesNumberFavoriteButton :tile-number="number" />
        <TemplatesNumberPrintButton :tile-number="number" />
        <TemplatesNumberCloseButton />
      </div>
      <CommonZoomWrapper class="flex-grow-1" :src="src" />
      <div v-if="!state.isFullscreen" class="text-light p-2 text-center">
        {{ title }}
      </div>
      <TemplatesNumberPrevNextButton
        type="prev"
        class="position-absolute top-50 start-0 translate-middle-y"
      />
      <TemplatesNumberPrevNextButton
        type="next"
        class="position-absolute top-50 end-0 translate-middle-y"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();

const number = computed(() => {
  const paramsNumber = route.params.number;
  if (Array.isArray(paramsNumber)) {
    return parseInt(paramsNumber[0]);
  } else {
    return parseInt(paramsNumber);
  }
});
const title = computed(() =>
  t("tile-title", {
    number: number.value,
    x: number.value % 20,
    y: Math.floor(number.value / 20),
  })
);
const src = computed(() => `/images/templates/${number.value}-detailed.webp`);
const state = reactive({ isFullscreen: false });
</script>
