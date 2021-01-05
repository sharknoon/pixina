<template>
  <div class="h-100 d-flex flex-column">
    <div class="flex-grow-1 overflow-auto p-2 position-relative">
      <div class="row row-cols-1 row-cols-lg-2 row-cols-xxl-4 m-0">
        <div v-for="color in colors" :key="color.number" class="col p-2">
          <div class="card position-relative h-100">
            <div class="flex-fill row g-0">
              <div
                class="col-3"
                :style="
                  'background: ' +
                  color.hex_place +
                  '; border-radius: 0.25rem 0 0 0.25rem'
                "
              ></div>
              <div class="col-9 d-flex flex-column">
                <div class="card-body">
                  <h5 class="card-title">{{ color.name }}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">
                    {{ color.number }}
                  </h6>
                  <font-awesome-icon :icon="['fas', 'cubes']" />
                  {{ color.amount }} Pixel
                  <div v-if="color.amount > 140" class="d-flex">
                    <font-awesome-icon :icon="['fas', 'th']" class="me-1" />
                    {{ Math.floor(color.amount / 140) }} Farbquadrate +
                    {{ color.amount % 140 }} Pixel
                  </div>
                  <a
                    href="#"
                    class="btn btn-light position-absolute top-0 end-0 m-2"
                    data-bs-toggle="modal"
                    :data-bs-target="'#infoModal' + color.number"
                  >
                    <font-awesome-icon
                      :icon="['far', 'info-circle']"
                      class="align-middle"
                    />
                  </a>
                </div>
                <div class="card-footer p-2">
                  <a
                    href="#"
                    class="btn btn-light"
                    data-bs-toggle="modal"
                    :data-bs-target="'#cuttingModal' + color.number"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'cut']"
                      class="align-middle mb-1"
                    />
                    Zuschneiden
                  </a>
                </div>
              </div>
            </div>
          </div>
          <!-- Color Info Modal -->
          <div
            class="modal fade"
            :id="'infoModal' + color.number"
            tabindex="-1"
            :aria-labelledby="'infoModal' + color.number + 'Label'"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <font-awesome-icon
                    :icon="['far', 'info-circle']"
                    size="lg"
                    class="align-middle mb-1 me-2"
                  />
                  <h5 class="modal-title" id="exampleModalLabel">
                    Farbinformationen
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <table class="table mb-0">
                    <tr>
                      <th>Farbe</th>
                      <td :style="'background: ' + color.hex_place"></td>
                    </tr>
                    <tr>
                      <th>Name</th>
                      <td>{{ color.name }}</td>
                    </tr>
                    <tr>
                      <th>Pixelhobby-Code</th>
                      <td>{{ color.number }}</td>
                    </tr>
                    <tr>
                      <th>Pixelhobby-RGB</th>
                      <td>{{ color.hex }}</td>
                    </tr>
                    <tr>
                      <th>Place-RGB</th>
                      <td>{{ color.hex_place }}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- Cutting Modal -->
          <div
            class="modal fade"
            :id="'cuttingModal' + color.number"
            tabindex="-1"
            :aria-labelledby="'cuttingModal' + color.number + 'Label'"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <font-awesome-icon
                    :icon="['far', 'info-circle']"
                    size="lg"
                    class="align-middle mb-1 me-2"
                  />
                  <h5 class="modal-title" id="exampleModalLabel">
                    Schneideinformation
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <h5>
                    {{ Math.floor(color.amount / 140) }} ganze Platte{{
                      Math.floor(color.amount / 140) != 1 ? "n" : ""
                    }}
                    +
                  </h5>
                  <ColorPlate
                    :color="color"
                    :withCuttingLine="true"
                    :usedPixels="color.amount % 140"
                  ></ColorPlate>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="processed_tiles < tiles.length"
        class="position-absolute start-0 top-0 bottom-0 end-0 d-flex flex-column align-items-center justify-content-center loading-overlay"
      >
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="mt-2">
          {{ processed_tiles }} von {{ tiles.length }} verarbeitet
        </div>
      </div>
    </div>
    <div class="p-4 d-flex align-items-center justify-content-between">
      <div>{{ Object.keys(colors).length }} von 16 Farben</div>
      <button type="button" class="btn btn-primary" @click="$emit('close')">
        Fertig
      </button>
    </div>
  </div>
</template>
<script>
import ColorPlate from "./ColorPlate";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faInfoCircle } from "@fortawesome/pro-regular-svg-icons";
import { faCut, faCubes, faTh } from "@fortawesome/pro-solid-svg-icons";
library.add(faInfoCircle, faCut, faCubes, faTh);

export default {
  name: "TileColors",
  data() {
    return {
      processed_tiles: 0,
      colors: {},
      tempColors: {},
    };
  },
  props: {
    tiles: {
      type: Array,
      required: true,
    },
  },
  components: {
    ColorPlate,
  },
  watch: {
    processed_tiles: function (val) {
      if (val >= this.tiles.length) {
        this.colors = this.tempColors;
      }
    },
  },
  mounted() {
    this.countColors();
  },
  methods: {
    countColors() {
      this.processed_tiles = 0;
      this.colors = {};
      this.tempColors = {};

      this.tiles.forEach((tile) => {
        let img = new Image();
        let self = this;
        img.onload = function () {
          let canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          let context = canvas.getContext("2d");
          context.drawImage(img, 0, 0, img.width, img.height);
          let x, y;
          for (x = 0; x < img.width; x++) {
            for (y = 0; y < img.height; y++) {
              let color = context.getImageData(x, y, 1, 1).data;
              if (color in self.tempColors) {
                self.tempColors[color].amount =
                  self.tempColors[color].amount + 1;
              } else {
                self.tempColors[color] = self.getColorInformations(color);
                self.tempColors[color].amount = 1;
              }
            }
          }
          self.processed_tiles = self.processed_tiles + 1;
        };
        img.src = tile.src_thumbnail;
      });
    },

    getColorInformations(color) {
      if (color[0] == 228 && color[1] == 228 && color[2] == 228) {
        return {
          name: "Hellgrau",
          number: 411,
          hex: "#c4c4c4",
          hex_place: "#e4e4e4",
        };
      } else if (color[0] == 34 && color[1] == 34 && color[2] == 34) {
        return {
          name: "Schwarz",
          number: 441,
          hex: "#1f2a32",
          hex_place: "#222222",
        };
      } else if (color[0] == 255 && color[1] == 255 && color[2] == 255) {
        return {
          name: "Weiß",
          number: 100,
          hex: "#e8ebed",
          hex_place: "#ffffff",
        };
      } else if (color[0] == 136 && color[1] == 136 && color[2] == 136) {
        return {
          name: "Grau",
          number: 172,
          hex: "#b0d3cd",
          hex_place: "#888888",
        };
      } else if (color[0] == 0 && color[1] == 131 && color[2] == 199) {
        return {
          name: "Wasser-Blau",
          number: 469,
          hex: "#459bc1",
          hex_place: "#0083c7",
        };
      } else if (color[0] == 0 && color[1] == 0 && color[2] == 234) {
        return {
          name: "Blau",
          number: 293,
          hex: "#005eab",
          hex_place: "#0000ea",
        };
      } else if (color[0] == 2 && color[1] == 190 && color[2] == 1) {
        return {
          name: "Grün",
          number: 245,
          hex: "#328529",
          hex_place: "#02be01",
        };
      } else if (color[0] == 229 && color[1] == 0 && color[2] == 0) {
        return {
          name: "Rot",
          number: 155,
          hex: "#b22e23",
          hex_place: "#e50000",
        };
      } else if (color[0] == 255 && color[1] == 167 && color[2] == 209) {
        return {
          name: "Pink",
          number: 103,
          hex: "#e7c0c3",
          hex_place: "#ffa7d1",
        };
      } else if (color[0] == 229 && color[1] == 149 && color[2] == 0) {
        return {
          name: "Orange",
          number: 266,
          hex: "#e79523",
          hex_place: "#e59500",
        };
      } else if (color[0] == 0 && color[1] == 211 && color[2] == 221) {
        return {
          name: "Grün-Blau",
          number: 370,
          hex: "#00a99d",
          hex_place: "#00d3dd",
        };
      } else if (color[0] == 229 && color[1] == 217 && color[2] == 0) {
        return {
          name: "Gelb",
          number: 133,
          hex: "#d6cd30",
          hex_place: "#e5d900",
        };
      } else if (color[0] == 148 && color[1] == 224 && color[2] == 68) {
        return {
          name: "Hellgrün",
          number: 246,
          hex: "#75a958",
          hex_place: "#94e044",
        };
      } else if (color[0] == 160 && color[1] == 106 && color[2] == 66) {
        return {
          name: "Braun",
          number: 461,
          hex: "#9a6944",
          hex_place: "#a06a42",
        };
      } else if (color[0] == 207 && color[1] == 110 && color[2] == 228) {
        return {
          name: "Violett",
          number: 442,
          hex: "#b285af",
          hex_place: "#cf6ee4",
        };
      } else if (color[0] == 130 && color[1] == 0 && color[2] == 128) {
        return {
          name: "Lila",
          number: 351,
          hex: "#97326b",
          hex_place: "#820080",
        };
      } else {
        return {
          name: "Unbekannt",
          number: -1,
          hex: "#00000000",
          hex_place: "#00000000",
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.loading-overlay {
  backdrop-filter: blur(3px);
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.card {
  min-height: 12rem;
}
</style>