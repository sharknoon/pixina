<script setup lang="ts">
const favoriteTiles = useFavoriteTilesStore();
</script>
<template>
  <div>
    <h3 class="p-3 pb-0 m-0">{{ $t("favorites") }}</h3>
    <TemplatesTileList filter="favorites" />
    <ClientOnly>
      <TemplatesNoFavorites v-if="favoriteTiles.favoriteTiles.length < 1" />
      <template #fallback>
        <TemplatesNoFavorites />
      </template>
    </ClientOnly>
    <h3 class="p-3 pb-0 m-0">{{ $t("all-templates") }}</h3>
    <TemplatesTileList />
    <TemplatesLegendComponent />
  </div>
</template>
