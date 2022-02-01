<template>
  <div>
    <h3 class="p-3 pb-0 m-0">
      {{ t("favorites") }}
    </h3>
    <TileList filter="favorites" />
    <NoFavorites v-if="$store.state.favoriteTiles.length < 1" />
    <h3 class="p-3 pb-0 m-0">
      {{ t("all-templates") }}
    </h3>
    <TileList />
  </div>
</template>
<script setup>
import TileList from "@/components/templates/TileList";
import NoFavorites from "@/components/templates/NoFavorites";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>