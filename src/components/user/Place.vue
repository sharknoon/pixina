<template>
  <div id="place-wrapper" class="h-100 d-flex flex-column">
    <pinch-zoom
      limitZoom="15"
      backgroundColor="white"
      disableZoomControl="disable"
      class="h-100 flex-grow-1"
    >
      <img :src="placeUrl" />
    </pinch-zoom>
    <div class="d-flex justify-content-between p-4">
      <div class="btn-group" role="group" aria-label="Image type">
        <input
          type="radio"
          class="btn-check"
          id="btn-check-original"
          autocomplete="off"
          value="0"
          v-model="selectedImage"
          checked
        />
        <label class="btn btn-outline-secondary" for="btn-check-original">
          <font-awesome-icon :icon="['fas', 'certificate']" /> Original
        </label>

        <input
          type="radio"
          class="btn-check"
          id="btn-check-cleaned"
          autocomplete="off"
          value="1"
          v-model="selectedImage"
        />
        <label class="btn btn-outline-secondary" for="btn-check-cleaned">
          <font-awesome-icon :icon="['fas', 'sparkles']" /> Bereinigt
        </label>
      </div>

      <div>
        <input
          v-model="isGridVisible"
          type="checkbox"
          class="btn-check"
          id="btn-check-grid"
          autocomplete="off"
        />
        <label class="btn btn-secondary" for="btn-check-grid">
          <font-awesome-icon v-if="isGridVisible" :icon="['far', 'th']" />
          <font-awesome-icon v-if="!isGridVisible" :icon="['far', 'square']" />
          Raster
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTh } from "@fortawesome/pro-regular-svg-icons";
import { faSquare } from "@fortawesome/pro-regular-svg-icons";
import { faCertificate } from "@fortawesome/pro-solid-svg-icons";
import { faSparkles } from "@fortawesome/pro-solid-svg-icons";
library.add(faTh, faSquare, faCertificate, faSparkles);

export default {
  name: "Place",
  data() {
    return {
      isGridVisible: false,
      selectedImage: 0,
    };
  },
  computed: {
    placeUrl: function () {
      let fileName = this.selectedImage == 0 ? "original" : "cleaned";
      fileName += this.isGridVisible ? "_grid" : "";
      return require("./../../assets/images/place/" + fileName + ".webp");
    },
  },
  components: {
    PinchZoom: () => import("vue-pinch-zoom"),
  },
};
</script>
<style lang="scss" scoped>
#place-wrapper {
  img {
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
}
</style>