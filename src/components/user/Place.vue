<template>
  <div id="place-wrapper" class="h-100 d-flex flex-column">
    <pinch-zoom
      limitZoom="15"
      backgroundColor="white"
      disableZoomControl="disable"
      class="h-100 flex-grow-1"
    >
      <img src="" />
    </pinch-zoom>
    <div class="d-flex justify-content-between p-4">
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary active">
          <input
            type="radio"
            name="place-toggle-image"
            id="place-toggle-original"
            checked
          />
          Original
        </label>
        <label class="btn btn-secondary">
          <input
            type="radio"
            name="place-toggle-image"
            id="place-toggle-cleaned"
          />
          Bereinigt
        </label>
      </div>
      <div class="btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary">
          <input type="checkbox"/>
          Raster
          <v-icon>mdi-grid</v-icon>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Place",
  data() {
    return {
      isGridVisible: false,
      selectedImage: 0,
    };
  },
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