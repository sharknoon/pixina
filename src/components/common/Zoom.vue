<template>
  <div class="position-relative overflow-hidden" style="touch-action: none">
    <div
      class="position-absolute end-0 bottom-0 m-4 btn-group-vertical"
      style="z-index: 1"
    >
      <button type="button" @click="zoomIn()" class="btn btn-secondary">
        <font-awesome-icon :icon="['far', 'plus']" />
      </button>
      <button type="button" @click="zoomOut()" class="btn btn-secondary">
        <font-awesome-icon :icon="['far', 'minus']" />
      </button>
    </div>
    <img
      id="zoom-img"
      :src="src"
      class="
        img-pixelated
        mw-100
        mh-100
        position-absolute
        top-0
        end-0
        bottom-0
        start-0
        m-auto
      "
    />
  </div>
</template>
<script>
import Zoom from "@/js/zoom";

export default {
  name: "Zoom",
  data() {
    return {
      zoom: null,
    };
  },
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.zoom = new Zoom(document.getElementById("zoom-img"));
  },
  methods: {
    zoomIn() {
      this.zoom.zoom(1);
    },
    zoomOut() {
      this.zoom.zoom(-1);
    },
  },
};
</script>