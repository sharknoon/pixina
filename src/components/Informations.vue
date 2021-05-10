<template>
  <div class="container py-3">
    <h1>{{ $t("informations-title") }}</h1>
    <p>{{ $t("informations-body") }}</p>

    <h3>{{ $t("informations-faq") }}</h3>
    <div class="accordion pb-3" id="faq-accordion">
      <div v-for="(faq, index) in faqs" :key="faq.title" class="accordion-item">
        <h2 class="accordion-header" :id="'heading-faq-' + index">
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
          <div class="accordion-body" v-html="faq.text"></div>
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
            <p class="card-text" v-html="galleryPicture.text"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Informations",
  computed: {
    faqs() {
      return [
        {
          title: this.$t("informations-faq-pixina-title"),
          text: this.$t("informations-faq-pixina-text"),
        },
        {
          title: this.$t("informations-faq-place-title"),
          text: this.$t("informations-faq-place-text", {
            link: '<a href="/place">Place</a>',
          }),
        },
        {
          title: this.$t("informations-faq-reddit-title"),
          text: this.$t("informations-faq-reddit-text", {
            "link-reddit": '<a href="https://www.reddit.com/">Reddit</a>',
            "link-subreddit":
              '<a href="https://www.reddit.com/r/place/">Subreddit</a>',
          }),
        },
        {
          title: this.$t("informations-faq-art-title"),
          text: this.$t("informations-faq-art-text"),
        },
        {
          title: this.$t("informations-faq-size-title"),
          text: this.$t("informations-faq-size-text"),
        },
        {
          title: this.$t("informations-faq-duration-title"),
          text: this.$t("informations-faq-duration-text"),
        },
        {
          title: this.$t("informations-faq-persons-title"),
          text: this.$t("informations-faq-persons-text"),
        },
      ];
    },
    galleryPictures() {
      return [
        {
          image: require("@/assets/images/informations/pixeling.webp"),
          title: this.$t("informations-gallery-pixeling-title"),
          text: this.$t("informations-gallery-pixeling-text"),
        },
        {
          image: require("@/assets/images/informations/base-colors.webp"),
          title: this.$t("informations-gallery-base-colors-title"),
          text: this.$t("informations-gallery-base-colors-text"),
        },
        {
          image: require("@/assets/images/informations/base-color-selection.webp"),
          title: this.$t("informations-gallery-base-color-selection-title"),
          text: this.$t("informations-gallery-base-color-selection-text", {
            link: '<a href="https://pixelhobby-shop.de/">Pixelhobby</a>',
          }),
        },
        {
          image: require("@/assets/images/informations/first-pixel.webp"),
          title: this.$t("informations-gallery-first-pixel-title"),
          text: this.$t("informations-gallery-first-pixel-text"),
        },
        {
          image: require("@/assets/images/informations/new-color-plates.webp"),
          title: this.$t("informations-gallery-new-color-plates-title"),
          text: this.$t("informations-gallery-new-color-plates-text"),
        },
        {
          image: require("@/assets/images/informations/image-numbering.webp"),
          title: this.$t("informations-gallery-image-numbering-title"),
          text: this.$t("informations-gallery-image-numbering-text"),
        },
      ];
    },
  },
};
</script>