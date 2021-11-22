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
          v-model="placeVariant"
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
          v-model="placeVariant"
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
<script>
import Zoom from "@/components/common/Zoom";

export default {
  name: "Place",
  data() {
    return {
      grid: false,
      placeVariant: "original",
    };
  },
  components: {
    Zoom,
  },
  mounted() {
    this.readQueryParams();
  },
  watch: {
    placeVariant() {
      this.updateQueryParams();
    },
    grid() {
      this.updateQueryParams();
    },
  },
  methods: {
    readQueryParams() {
      const variant = this.$route.query.variant;
      if (variant) {
        switch (variant.toLowerCase()) {
          case "original":
            this.placeVariant = "original";
            break;
          case "cleaned":
            this.placeVariant = "cleaned";
            break;
        }
      }
      const grid = this.$route.query.grid;
      if (grid) {
        switch (grid.toLowerCase()) {
          case "true":
            this.grid = true;
            break;
          case "false":
            this.grid = false;
            break;
        }
      }
    },
    updateQueryParams() {
      const query = {};
      if (this.placeVariant === "cleaned") {
        query["variant"] = this.placeVariant;
      }
      if (this.grid) {
        query["grid"] = this.grid;
      }
      this.$router.replace({ query: query });
    },
  },
  computed: {
    placeUrl: function () {
      let fileName = this.placeVariant + (this.grid ? "_grid" : "");
      return require("@/assets/images/place/" + fileName + ".webp");
    },
  },
};
</script>