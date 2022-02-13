<template>
  <button class="btn btn-dark" @click="close()">
    <font-awesome-icon :icon="['fal', 'times']" size="lg" />
  </button>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function close() {
  router.push({ name: "Templates" });
}
</script>