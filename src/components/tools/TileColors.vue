<template>
  <div class="h-100 d-flex flex-column">
    <div class="flex-grow-1 overflow-auto p-2 position-relative">
      <div class="row row-cols-1 row-cols-lg-2 row-cols-xxl-4 m-0">
        <div
          v-for="color in sortedColors"
          :key="color.number_pixelhobby"
          class="col p-2"
        >
          <ColorCard :color="color" />
        </div>
      </div>
      <div
        v-if="processed_tiles < tiles.length"
        class="position-absolute start-0 top-0 bottom-0 end-0 d-flex flex-column align-items-center justify-content-center"
      >
        <div
          class="spinner-border"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="mt-2">
          {{
            t("tile-processing", {
              current: processed_tiles, amount: tiles.length,
            })
          }}
        </div>
      </div>
    </div>
    <div class="p-4 d-flex align-items-center justify-content-between">
      <div>{{ t("amount-colors", { amount: sortedColors.length }) }}</div>
      <div>
        <button
          type="button"
          class="btn btn-secondary me-3"
          data-bs-toggle="modal"
          data-bs-target="#orderModal"
          :disabled="processed_tiles < tiles.length"
        >
          <font-awesome-icon
            :icon="['far', 'shopping-cart']"
            class="align-middle"
          />
          {{ t("order") }}
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="goBack()"
        >
          {{ t("finish") }}
        </button>
      </div>
    </div>
    <OrderModal
      :colors="sortedColors"
      :tiles="tiles"
    />
  </div>
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import ColorCard from "@/components/tools/ColorCard";
import colorsInfos from "@/data/colors";
import OrderModal from "@/components/tools/OrderModal";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const processed_tiles = ref(0);
const colors = ref([]);

const tiles = computed(() => {
  const queryParam = route.query.tiles;
  if (!queryParam) {
    return [];
  }
  if (!Array.isArray(queryParam)) {
    return [queryParam];
  }
  return queryParam;
});

const sortedColors = computed(() => {
  return Object.values(colors.value).sort((a, b) => {
    return b.amount - a.amount;
  });
});

onMounted(() => {
  let countedColors = [];
  tiles.value.forEach((number, index) => {
    let img = new Image();
    img.onload = () => {
      let canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      let context = canvas.getContext("2d");
      context.drawImage(img, 0, 0, img.width, img.height);
      let x, y;
      for (x = 0; x < img.width; x++) {
        for (y = 0; y < img.height; y++) {
          let color = context.getImageData(x, y, 1, 1).data;
          if (color in countedColors) {
            countedColors[color].amount += 1;
          } else {
            countedColors[color] = getColorInformations(color);
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
    img.src = require("@/assets/images/templates/" + number + ".webp");
  });
});

function goBack() {
  window.history.length > 1 ? router.go(-1) : router.push("/");
}

function getColorInformations(color) {
  if (color[0] == 255 && color[1] == 255 && color[2] == 255) {
    return colorsInfos[0];
  } else if (color[0] == 228 && color[1] == 228 && color[2] == 228) {
    return colorsInfos[1];
  } else if (color[0] == 136 && color[1] == 136 && color[2] == 136) {
    return colorsInfos[2];
  } else if (color[0] == 34 && color[1] == 34 && color[2] == 34) {
    return colorsInfos[3];
  } else if (color[0] == 255 && color[1] == 167 && color[2] == 209) {
    return colorsInfos[4];
  } else if (color[0] == 229 && color[1] == 0 && color[2] == 0) {
    return colorsInfos[5];
  } else if (color[0] == 229 && color[1] == 149 && color[2] == 0) {
    return colorsInfos[6];
  } else if (color[0] == 160 && color[1] == 106 && color[2] == 66) {
    return colorsInfos[7];
  } else if (color[0] == 229 && color[1] == 217 && color[2] == 0) {
    return colorsInfos[8];
  } else if (color[0] == 148 && color[1] == 224 && color[2] == 68) {
    return colorsInfos[9];
  } else if (color[0] == 2 && color[1] == 190 && color[2] == 1) {
    return colorsInfos[10];
  } else if (color[0] == 0 && color[1] == 211 && color[2] == 221) {
    return colorsInfos[11];
  } else if (color[0] == 0 && color[1] == 131 && color[2] == 199) {
    return colorsInfos[12];
  } else if (color[0] == 0 && color[1] == 0 && color[2] == 234) {
    return colorsInfos[13];
  } else if (color[0] == 207 && color[1] == 110 && color[2] == 228) {
    return colorsInfos[14];
  } else if (color[0] == 130 && color[1] == 0 && color[2] == 128) {
    return colorsInfos[15];
  } else {
    return {};
  }
}
</script>
<style lang="scss" scoped>
.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
