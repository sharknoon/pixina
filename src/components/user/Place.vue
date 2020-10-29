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
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary active">
          <input
            type="radio"
            name="place-toggle-image"
            v-model="selectedImage"
          />
          <font-awesome-icon :icon="['fas', 'certificate']" />
          Original
        </label>
        <label class="btn btn-secondary">
          <input
            type="radio"
            name="place-toggle-image"
            v-model="selectedImage"
          />
          <font-awesome-icon :icon="['fas', 'sparkles']" />
          Bereinigt
        </label>
      </div>
      <div class="btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary">
          <input
            type="checkbox"
            v-model="isGridVisible"
          />
          <font-awesome-icon :icon="['far', 'th']" />
          Raster
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTh } from "@fortawesome/pro-regular-svg-icons";
import { faCertificate } from "@fortawesome/pro-solid-svg-icons";
import { faSparkles } from "@fortawesome/pro-solid-svg-icons";
library.add(
  faTh,
  faCertificate,
  faSparkles,
);

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
      let fileName = (selectedImage == 0) ? "original" : "cleaned;
      filename += isGridVisible ? "_grid" : "";
      return require("./../../assets/images/place/" + fileName + ".webp");
    }
  }
  components: {
    PinchZoom: () => import("vue-pinch-zoom"),
  },
  methods: {
    getItemUrl(number) {
      return require("./../../assets/images/history/" + number + ".webp");
    },
  },
};
</script>
