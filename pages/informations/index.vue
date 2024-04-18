<template>
  <div class="container py-3">
    <h1>{{ $t("informations-title") }}</h1>
    <p>{{ $t("informations-body") }}</p>

    <InformationsProjectProgress></InformationsProjectProgress>

    <h3>{{ $t("informations-faq") }}</h3>
    <div id="faq-accordion" class="accordion pb-3">
      <div v-for="(faq, index) in faqs" :key="faq.title" class="accordion-item">
        <h2 :id="'heading-faq-' + index" class="accordion-header">
          <button
            class="accordion-button"
            :class="index == 0 ? '' : 'collapsed'"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapse-faq-' + index"
            :aria-expanded="index == 0 ? 'true' : 'false'"
            :aria-controls="'collapse-faq-' + index"
          >
            {{ faq.title }}
          </button>
        </h2>
        <div
          :id="'collapse-faq-' + index"
          class="accordion-collapse collapse"
          :class="index == 0 ? 'show' : ''"
          :aria-labelledby="'heading-faq-' + index"
          data-bs-parent="#faq-accordion"
        >
          <div class="accordion-body">{{ faq.text }}</div>
        </div>
      </div>
    </div>

    <h3>{{ $t("informations-gallery") }}</h3>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div
        v-for="galleryPicture in galleryPictures"
        :key="galleryPicture.title"
        class="col"
      >
        <div class="card h-100">
          <img :src="galleryPicture.image" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{ galleryPicture.title }}</h5>
            <p class="card-text">{{ galleryPicture.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n();

const faqs = computed(() => [
  {
    title: t("informations-faq-pixina-title"),
    text: t("informations-faq-pixina-text"),
  },
  {
    title: t("informations-faq-place-title"),
    text: t("informations-faq-place-text"),
  },
  {
    title: t("informations-faq-reddit-title"),
    text: t("informations-faq-reddit-text"),
  },
  {
    title: t("informations-faq-art-title"),
    text: t("informations-faq-art-text"),
  },
  {
    title: t("informations-faq-size-title"),
    text: t("informations-faq-size-text"),
  },
  {
    title: t("informations-faq-duration-title"),
    text: t("informations-faq-duration-text"),
  },
  {
    title: t("informations-faq-persons-title"),
    text: t("informations-faq-persons-text"),
  },
]);
const galleryPictures = computed(() => [
  {
    image: "/images/informations/pixeling.webp",
    title: t("informations-gallery-pixeling-title"),
    text: t("informations-gallery-pixeling-text"),
  },
  {
    image: "/images/informations/base-colors.webp",
    title: t("informations-gallery-base-colors-title"),
    text: t("informations-gallery-base-colors-text"),
  },
  {
    image: "/images/informations/base-color-selection.webp",
    title: t("informations-gallery-base-color-selection-title"),
    text: t("informations-gallery-base-color-selection-text"),
  },
  {
    image: "/images/informations/first-pixel.webp",
    title: t("informations-gallery-first-pixel-title"),
    text: t("informations-gallery-first-pixel-text"),
  },
  {
    image: "/images/informations/new-color-plates.webp",
    title: t("informations-gallery-new-color-plates-title"),
    text: t("informations-gallery-new-color-plates-text"),
  },
  {
    image: "/images/informations/image-numbering.webp",
    title: t("informations-gallery-image-numbering-title"),
    text: t("informations-gallery-image-numbering-text"),
  },
]);
</script>
