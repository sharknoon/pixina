<template>
  <button class="btn btn-dark" @click="print()">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
      stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
  </button>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  tileNumber: {
    type: Number,
    required: true,
  },
});

function print() {
  const iframe = document.createElement('iframe');
  iframe.style.height = '0';
  iframe.style.visibility = 'hidden';
  iframe.style.width = '0';
  iframe.setAttribute('srcdoc', '<html><body></body></html>');

  document.body.appendChild(iframe);

  iframe.addEventListener('load', function () {
    // Create the header
    const header = document.createElement("h1");
    header.innerText = t("tile-title", {
      number: props.tileNumber,
      x: props.tileNumber % 20,
      y: Math.floor(props.tileNumber / 20),
    });
    header.style.fontFamily = "sans-serif";

    // Create the image
    const image = document.createElement("img");
    image.src = new URL(
      `../../assets/images/templates/${props.tileNumber}-detailed.webp`,
      import.meta.url
    ).href
    image.style.maxWidth = '100%';

    // Append the image to the iframe's body
    iframe.contentDocument?.body?.append(header, image);

    image.addEventListener('load', function () {
      // Invoke the print when the image is ready
      iframe.contentWindow?.print();
    });
  });
}

</script>
