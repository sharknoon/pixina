<template>
  <div class="h-100 d-flex flex-column">
    <div class="flex-grow-1 overflow-auto p-2 position-relative">
      <div class="row row-cols-1 row-cols-lg-2 row-cols-xxl-4 m-0">
        <div
          v-for="color in colors"
          :key="color.number_pixelhobby"
          class="col p-2"
        >
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
                  <h5 class="card-title">{{ color.name_place }}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">
                    {{ color.number_pixelhobby }}
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
                    :data-bs-target="'#infoModal' + color.number_pixelhobby"
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
                    :data-bs-target="'#cuttingModal' + color.number_pixelhobby"
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
            :id="'infoModal' + color.number_pixelhobby"
            tabindex="-1"
            :aria-labelledby="'infoModal' + color.number_pixelhobby + 'Label'"
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
                  <h6>
                    <font-awesome-icon :icon="['fas', 'image']" />
                    Originalbild
                  </h6>
                  <table class="table table-borderless">
                    <colgroup>
                      <col class="w-50" />
                      <col class="w-50" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>Farbe</th>
                        <td :style="'background: ' + color.hex_place"></td>
                      </tr>
                      <tr>
                        <th>Name</th>
                        <td>{{ color.name_place }}</td>
                      </tr>
                      <tr>
                        <th>RGB</th>
                        <td>{{ color.hex_place }}</td>
                      </tr>
                      <tr>
                        <th>Index</th>
                        <td>{{ color.number_place }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <h6>
                    <font-awesome-icon :icon="['fas', 'cubes']" />
                    Pixelhobby Pixels
                  </h6>
                  <table class="table table-borderless mb-0">
                    <colgroup>
                      <col class="w-50" />
                      <col class="w-50" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>Farbe</th>
                        <td :style="'background: ' + color.hex_pixelhobby"></td>
                      </tr>
                      <tr>
                        <th>Name</th>
                        <td>{{ color.name_pixelhobby }}</td>
                      </tr>
                      <tr>
                        <th>RGB</th>
                        <td>{{ color.hex_pixelhobby }}</td>
                      </tr>
                      <tr>
                        <th>Code</th>
                        <td>{{ color.number_pixelhobby }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- Cutting Modal -->
          <div
            class="modal fade"
            :id="'cuttingModal' + color.number_pixelhobby"
            tabindex="-1"
            :aria-labelledby="
              'cuttingModal' + color.number_pixelhobby + 'Label'
            "
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
                  {{ color.amount % 140 }} Pixel
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
      <div>{{ colors.length }} von 16 Farben</div>
      <button type="button" class="btn btn-primary" @click="goBack()">
        Fertig
      </button>
    </div>
  </div>
</template>
<script>
import ColorPlate from "./ColorPlate";

export default {
  name: "TileColors",
  data() {
    return {
      processed_tiles: 0,
      colors: [],
      tempColors: {},
    };
  },
  components: {
    ColorPlate,
  },
  computed: {
    tiles: function () {
      return this.$route.query.tiles;
    },
  },
  watch: {
    processed_tiles: function (val) {
      if (val >= this.tiles.length) {
        this.colors = Object.values(this.tempColors).sort(function (a, b) {
          return b.amount - a.amount;
        });
      }
    },
  },
  mounted() {
    this.countColors();
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    countColors() {
      this.processed_tiles = 0;
      this.colors = [];
      this.tempColors = {};

      this.tiles.forEach((number) => {
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
        img.src = require("./../../assets/images/templates/" +
          number +
          ".webp");
      });
    },

    getColorInformations(color) {
      if (color[0] == 255 && color[1] == 255 && color[2] == 255) {
        return {
          name_place: "Weiß",
          name_pixelhobby: "Weiß",
          hex_place: "#ffffff",
          hex_pixelhobby: "#e8ebed",
          number_place: 0,
          number_pixelhobby: 100,
        };
      } else if (color[0] == 228 && color[1] == 228 && color[2] == 228) {
        return {
          name_place: "Hellgrau",
          name_pixelhobby: "Turteltauben Grau",
          hex_place: "#e4e4e4",
          hex_pixelhobby: "#c4c7c8",
          number_place: 1,
          number_pixelhobby: 411,
        };
      } else if (color[0] == 136 && color[1] == 136 && color[2] == 136) {
        return {
          name_place: "Grau",
          name_pixelhobby: "Granitgrau",
          hex_place: "#888888",
          hex_pixelhobby: "#b0d3cd",
          number_place: 2,
          number_pixelhobby: 172,
        };
      } else if (color[0] == 34 && color[1] == 34 && color[2] == 34) {
        return {
          name_place: "Schwarz",
          name_pixelhobby: "Schwarz",
          hex_place: "#222222",
          hex_pixelhobby: "#1f2a32",
          number_place: 3,
          number_pixelhobby: 441,
        };
      } else if (color[0] == 255 && color[1] == 167 && color[2] == 209) {
        return {
          name_place: "Pink",
          name_pixelhobby: "Helles Altrosa",
          hex_place: "#ffa7d1",
          hex_pixelhobby: "#e7c0c3",
          number_place: 4,
          number_pixelhobby: 103,
        };
      } else if (color[0] == 229 && color[1] == 0 && color[2] == 0) {
        return {
          name_place: "Rot",
          name_pixelhobby: "Leuchtendes Rot",
          hex_place: "#e50000",
          hex_pixelhobby: "#b22e23",
          number_place: 5,
          number_pixelhobby: 155,
        };
      } else if (color[0] == 229 && color[1] == 149 && color[2] == 0) {
        return {
          name_place: "Orange",
          name_pixelhobby: "Mandarinenorange",
          hex_place: "#e59500",
          hex_pixelhobby: "#e79523",
          number_place: 6,
          number_pixelhobby: 266,
        };
      } else if (color[0] == 160 && color[1] == 106 && color[2] == 66) {
        return {
          name_place: "Braun",
          name_pixelhobby: "Mokkabraun",
          hex_place: "#a06a42",
          hex_pixelhobby: "#9a6944",
          number_place: 7,
          number_pixelhobby: 461,
        };
      } else if (color[0] == 229 && color[1] == 217 && color[2] == 0) {
        return {
          name_place: "Gelb",
          name_pixelhobby: "Zitronengelb",
          hex_place: "#e5d900",
          hex_pixelhobby: "#d6cd30",
          number_place: 8,
          number_pixelhobby: 133,
        };
      } else if (color[0] == 148 && color[1] == 224 && color[2] == 68) {
        return {
          name_place: "Hellgrün",
          name_pixelhobby: "Frühlingsgrün",
          hex_place: "#94e044",
          hex_pixelhobby: "#75a958",
          number_place: 9,
          number_pixelhobby: 246,
        };
      } else if (color[0] == 2 && color[1] == 190 && color[2] == 1) {
        return {
          name_place: "Grün",
          name_pixelhobby: "Grün",
          hex_place: "#02be01",
          hex_pixelhobby: "#328529",
          number_place: 10,
          number_pixelhobby: 245,
        };
      } else if (color[0] == 0 && color[1] == 211 && color[2] == 221) {
        return {
          name_place: "Grün-Blau",
          name_pixelhobby: "Dunkles Meergrün",
          hex_place: "#00d3dd",
          hex_pixelhobby: "#00a99d",
          number_place: 11,
          number_pixelhobby: 370,
        };
      } else if (color[0] == 0 && color[1] == 131 && color[2] == 199) {
        return {
          name_place: "Wasserblau",
          name_pixelhobby: "Meerblau",
          hex_place: "#0083c7",
          hex_pixelhobby: "#459bc1",
          number_place: 12,
          number_pixelhobby: 469,
        };
      } else if (color[0] == 0 && color[1] == 0 && color[2] == 234) {
        return {
          name_place: "Blau",
          name_pixelhobby: "Königsblau",
          hex_place: "#0000ea",
          hex_pixelhobby: "#005eab",
          number_place: 13,
          number_pixelhobby: 293,
        };
      } else if (color[0] == 207 && color[1] == 110 && color[2] == 228) {
        return {
          name_place: "Violett",
          name_pixelhobby: "Helles Lila-Rosa",
          hex_place: "#cf6ee4",
          hex_pixelhobby: "#b285af",
          number_place: 14,
          number_pixelhobby: 442,
        };
      } else if (color[0] == 130 && color[1] == 0 && color[2] == 128) {
        return {
          name_place: "Lila",
          name_pixelhobby: "Fuchsia",
          hex_place: "#820080",
          hex_pixelhobby: "#97326b",
          number_place: 15,
          number_pixelhobby: 351,
        };
      } else {
        return {
          name_place: "Unbekannt",
          name_pixelhobby: "Unbekannt",
          hex_place: "#00000000",
          hex_pixelhobby: "#00000000",
          number_place: -1,
          number_pixelhobby: -1,
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.loading-overlay {
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.card {
  min-height: 12rem;
}

.table > :not(caption) > * > * {
  padding: 0;
}
</style>
