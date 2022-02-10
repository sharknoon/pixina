<template>
  <div>
    <h3 class="p-3 pb-0 m-0">
      {{ t("favorites") }}
    </h3>
    <TileList filter="favorites" />
    <NoFavorites v-if="store.favoriteTiles.length < 1" />
    <h3 class="p-3 pb-0 m-0">
      {{ t("all-templates") }}
    </h3>
    <TileList />
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import { useStore } from "@/js/pinia";
import TileList from "@/components/templates/TileList";
import NoFavorites from "@/components/templates/NoFavorites";

const { t } = useI18n();
const store = useStore();
</script>