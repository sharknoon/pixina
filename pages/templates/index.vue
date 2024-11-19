<script setup lang="ts">
const favoriteTilesStore = useFavoriteTilesStore();
</script>
<template>
  <div>
    <h3 class="p-3 pb-0 m-0">{{ $t("favorites") }}</h3>
    <TemplatesTileList filter="favorites" />
    <ClientOnly>
      <TemplatesNoFavorites
        v-if="favoriteTilesStore.favoriteTiles.length < 1"
      />
      <template #fallback>
        <div class="d-flex flex-column align-items-center">
          <div>{{ $t("loading") }}</div>
        </div>
      </template>
    </ClientOnly>

    <h3 class="p-3 pb-0 m-0">{{ $t("all-templates") }}</h3>
    <TemplatesTileList />
    <TemplatesLegendComponent />
  </div>
</template>
