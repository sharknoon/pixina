<template>
  <button class="btn btn-dark m-3" :disabled="disabled" @click="goToPrevNext()">
    <font-awesome-icon :icon="icon" size="2x" />
  </button>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const icon = computed(() => [
  "far",
  props.type === "next" ? "chevron-right" : "chevron-left",
]);
const number = computed(() => {
  const paramNumber = route.params.number;
  if (Array.isArray(paramNumber)) {
    return parseInt(paramNumber[0]);
  } else {
    return parseInt(paramNumber);
  }
});
const disabled = computed(() =>
  props.type === "next" ? number.value >= 499 : number.value <= 0
);

function goToPrevNext() {
  const newNumber = props.type === "next" ? number.value + 1 : number.value - 1;
  router.push({ name: "Template", params: { number: newNumber } });
}
</script>
