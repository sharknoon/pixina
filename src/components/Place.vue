<template>
  <div id="place-wrapper" class="h-100 d-flex flex-column">
    <Zoom class="flex-grow-1" :src="placeUrl" />
    <div class="d-flex justify-content-between p-4">
      <div class="btn-group me-2" role="group" aria-label="Image type">
        <input
          id="btn-check-original"
          v-model="variant"
          type="radio"
          class="btn-check"
          autocomplete="off"
          value="original"
          checked
        />
        <label class="btn btn-outline-secondary" for="btn-check-original">
          <font-awesome-icon :icon="['fas', 'certificate']" />
          {{ t("original") }}
        </label>

        <input
          id="btn-check-cleaned"
          v-model="variant"
          type="radio"
          class="btn-check"
          autocomplete="off"
          value="cleaned"
        />
        <label class="btn btn-outline-secondary" for="btn-check-cleaned">
          <font-awesome-icon :icon="['fas', 'sparkles']" />
          {{ t("cleaned") }}
        </label>
      </div>
      <div>
        <input
          id="btn-check-grid"
          v-model="grid"
          type="checkbox"
          class="btn-check"
          autocomplete="off"
        />
        <label class="btn btn-secondary" for="btn-check-grid">
          <font-awesome-icon v-if="grid" :icon="['far', 'th']" />
          <font-awesome-icon v-if="!grid" :icon="['far', 'square']" />
          {{ t("grid") }}
        </label>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import Zoom from "@/components/common/Zoom.vue";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const grid = ref(false);
const variant = ref("original");

const placeUrl = computed(() => {
  let fileName: string = variant.value + (grid.value ? "_grid" : "");
  return new URL(`../assets/images/place/${fileName}.webp`, import.meta.url)
    .href;
});

watch(variant, () => updateQueryParams());
watch(grid, () => updateQueryParams());

onMounted(() => readQueryParams());

function readQueryParams() {
  const variantQuery = route.query.variant;
  if (variantQuery) {
    switch (variantQuery.toString().toLowerCase()) {
      case "original":
        variant.value = "original";
        break;
      case "cleaned":
        variant.value = "cleaned";
        break;
    }
  }
  const gridQuery = route.query.grid;
  if (gridQuery) {
    switch (gridQuery.toString().toLowerCase()) {
      case "true":
        grid.value = true;
        break;
      case "false":
        grid.value = false;
        break;
    }
  }
}

function updateQueryParams() {
  if (variant.value === "cleaned" && grid.value) {
    router.replace({
      query: {
        variant: "cleaned",
        grid: "true",
      },
    });
  } else if (variant.value === "cleaned") {
    router.replace({
      query: {
        variant: "cleaned",
      },
    });
  } else if (grid.value) {
    router.replace({
      query: {
        grid: "true",
      },
    });
  } else {
    router.replace({
      query: {},
    });
  }
}
</script>
