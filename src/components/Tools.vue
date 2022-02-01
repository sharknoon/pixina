<template>
  <div
    v-if="$router.currentRoute.value.path === '/tools'"
    id="tools-wrapper"
    class="h-100"
  >
    <TileSelection />
  </div>
  <router-view />
</template>
<script setup>
import TileSelection from "@/components/tools/TileSelection";
</script>
