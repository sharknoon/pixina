<template>
  <button @click="close()" class="btn btn-dark">
    <font-awesome-icon :icon="['fal', 'times']" size="lg" />
  </button>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function close() {
  router.push({ name: "Templates" });
}
</script>