<template>
  <div>
    <h3 class="p-3 pb-0 m-0">{{ t('favorites') }}</h3>
    <TileList filter="favorites" />
    <NoFavorites v-if="store.favoriteTiles.length < 1" />
    <h3 class="p-3 pb-0 m-0">{{ t('all-templates') }}</h3>
    <TileList />
    <LegendComponent />
  </div>
  <router-view />
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useFavoriteTilesStore } from '@/stores/favorite-tiles'
import TileList from '@/components/templates/TileList.vue'
import NoFavorites from '@/components/templates/NoFavorites.vue'
import LegendComponent from '@/components/templates/LegendComponent.vue'

const { t } = useI18n()
const store = useFavoriteTilesStore()
</script>
