<template>
  <div class="h-100 d-flex flex-column">
    <div class="flex-grow-1 overflow-auto p-2 position-relative">
      <div class="row row-cols-1 row-cols-lg-2 row-cols-xxl-4 m-0">
        <div
          v-for="color in sortedColors"
          :key="color.number_pixelhobby"
          class="col p-2"
        >
          <ToolsColorCard :color="color" />
        </div>
      </div>
      <div
        v-if="processed_tiles < tiles.length"
        class="position-absolute start-0 top-0 bottom-0 end-0 d-flex flex-column align-items-center justify-content-center"
      >
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="mt-2">
          {{
            $t("tile-processing", {
              current: processed_tiles,
              amount: tiles.length,
            })
          }}
        </div>
      </div>
    </div>
    <div class="p-4 d-flex align-items-center justify-content-between">
      <div>{{ $t("amount-colors", { amount: sortedColors.length }) }}</div>
      <div>
        <button
          type="button"
          class="btn btn-secondary me-3"
          data-bs-toggle="modal"
          data-bs-target="#orderModal"
        >
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {{ $t("order") }}
        </button>
        <button type="button" class="btn btn-primary" @click="$router.back()">
          {{ $t("finish") }}
        </button>
      </div>
    </div>
    <ToolsOrderModal :colors="sortedColors" :tiles="tiles" />
  </div>
</template>
<script setup lang="ts">
interface Color {
  amount?: number;
  name_place: string;
  name_pixelhobby: string;
  hex_place: string;
  hex_pixelhobby: string;
  number_place: number;
  number_pixelhobby: number;
  id_pixelhobby: number;
}

const route = useRoute();

const processed_tiles: Ref<number> = ref(0);
const colors: Ref<Color[]> = ref([]);

const tiles = computed<number[]>(() => {
  const queryParam = route.query.tiles;
  if (!queryParam) {
    return [];
  }
  if (!Array.isArray(queryParam)) {
    return [parseInt(queryParam)];
  }
  return queryParam.map((tile) => parseInt(tile || "-1"));
});

const sortedColors = computed(() => {
  return Object.values(colors.value).sort((a, b) => {
    return (b.amount || 0) - (a.amount || 0);
  });
});

onMounted(() => {
  const countedColors: Color[] = [];
  tiles.value.forEach((number, index) => {
    const img: HTMLImageElement = new Image();
    img.onload = () => {
      const canvas: HTMLCanvasElement = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const context: CanvasRenderingContext2D = canvas.getContext(
        "2d",
      ) as CanvasRenderingContext2D;
      context.drawImage(img, 0, 0, img.width, img.height);
      let x: number, y: number;
      for (x = 0; x < img.width; x++) {
        for (y = 0; y < img.height; y++) {
          const colorArray: Uint8ClampedArray = context.getImageData(
            x,
            y,
            1,
            1,
          ).data;
          // a simple hash for the color, just to identify it and count the amount
          const color: number =
            colorArray[0] + colorArray[1] * 1000 + colorArray[2] * 1000000;
          if (color in countedColors) {
            countedColors[color].amount =
              (countedColors[color].amount || 0) + 1;
          } else {
            countedColors[color] = getColorInformations(Array.from(colorArray));
            countedColors[color].amount = 1;
          }
        }
      }
      processed_tiles.value += 1;
      // Check if it was last tile
      if (index === tiles.value.length - 1) {
        colors.value = countedColors;
      }
    };
    img.src = `/images/templates/${number}.webp`;
  });
});

function getColorInformations(color: number[]): Color {
  if (color[0] == 255 && color[1] == 255 && color[2] == 255) {
    return colorInfos[0];
  } else if (color[0] == 228 && color[1] == 228 && color[2] == 228) {
    return colorInfos[1];
  } else if (color[0] == 136 && color[1] == 136 && color[2] == 136) {
    return colorInfos[2];
  } else if (color[0] == 34 && color[1] == 34 && color[2] == 34) {
    return colorInfos[3];
  } else if (color[0] == 255 && color[1] == 167 && color[2] == 209) {
    return colorInfos[4];
  } else if (color[0] == 229 && color[1] == 0 && color[2] == 0) {
    return colorInfos[5];
  } else if (color[0] == 229 && color[1] == 149 && color[2] == 0) {
    return colorInfos[6];
  } else if (color[0] == 160 && color[1] == 106 && color[2] == 66) {
    return colorInfos[7];
  } else if (color[0] == 229 && color[1] == 217 && color[2] == 0) {
    return colorInfos[8];
  } else if (color[0] == 148 && color[1] == 224 && color[2] == 68) {
    return colorInfos[9];
  } else if (color[0] == 2 && color[1] == 190 && color[2] == 1) {
    return colorInfos[10];
  } else if (color[0] == 0 && color[1] == 211 && color[2] == 221) {
    return colorInfos[11];
  } else if (color[0] == 0 && color[1] == 131 && color[2] == 199) {
    return colorInfos[12];
  } else if (color[0] == 0 && color[1] == 0 && color[2] == 234) {
    return colorInfos[13];
  } else if (color[0] == 207 && color[1] == 110 && color[2] == 228) {
    return colorInfos[14];
  } /*if (color[0] == 130 && color[1] == 0 && color[2] == 128)*/ else {
    return colorInfos[15];
  }
}
</script>
<style lang="scss" scoped>
.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
