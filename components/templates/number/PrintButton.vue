<template>
  <button class="btn btn-dark px-2" @click="print()">
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
        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
      />
    </svg>
  </button>
</template>
<script setup lang="ts">
const { t } = useI18n();

const props = defineProps({
  tileNumber: {
    type: Number,
    required: true,
  },
});

function print() {
  const iframe = document.createElement("iframe");
  iframe.style.height = "0";
  iframe.style.visibility = "hidden";
  iframe.style.width = "0";
  iframe.setAttribute("srcdoc", "<html><body></body></html>");

  document.body.appendChild(iframe);

  iframe.addEventListener("load", function () {
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
    image.src = `/images/templates/${props.tileNumber}-detailed.webp`;
    image.style.maxWidth = "100%";

    iframe.contentDocument?.body?.append(header, image);

    // Invoke the print when the image is ready
    image.addEventListener("load", function () {
      iframe.contentWindow?.print();
    });
  });
}
</script>
