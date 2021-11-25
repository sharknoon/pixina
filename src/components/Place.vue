<template>
  <div id="place-wrapper" class="h-100 d-flex flex-column">
    <Zoom class="flex-grow-1" :src="placeUrl"></Zoom>
    <div class="d-flex justify-content-between p-4">
      <div class="btn-group me-2" role="group" aria-label="Image type">
        <input
          type="radio"
          class="btn-check"
          id="btn-check-original"
          autocomplete="off"
          value="original"
          v-model="variant"
          checked
        />
        <label class="btn btn-outline-secondary" for="btn-check-original">
          <font-awesome-icon :icon="['fas', 'certificate']" />
          {{ $t("original") }}
        </label>

        <input
          type="radio"
          class="btn-check"
          id="btn-check-cleaned"
          autocomplete="off"
          value="cleaned"
          v-model="variant"
        />
        <label class="btn btn-outline-secondary" for="btn-check-cleaned">
          <font-awesome-icon :icon="['fas', 'sparkles']" />
          {{ $t("cleaned") }}
        </label>
      </div>
      <div>
        <input
          v-model="grid"
          type="checkbox"
          class="btn-check"
          id="btn-check-grid"
          autocomplete="off"
        />
        <label class="btn btn-secondary" for="btn-check-grid">
          <font-awesome-icon v-if="grid" :icon="['far', 'th']" />
          <font-awesome-icon v-if="!grid" :icon="['far', 'square']" />
          {{ $t("grid") }}
        </label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Zoom from "@/components/common/Zoom";

const route = useRoute();
const router = useRouter();

const grid = ref(false);
const variant = ref("original");

const placeUrl = computed(() => {
  let fileName = variant.value + (grid.value ? "_grid" : "");
  return require("@/assets/images/place/" + fileName + ".webp");
})

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
  const query = {};
  if (variant.value === "cleaned") {
    query["variant"] = variant.value;
  }
  if (grid.value) {
    query["grid"] = grid.value;
  }
  router.replace({ query: query });
}
</script>