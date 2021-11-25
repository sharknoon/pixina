<template>
  <button
    class="btn btn-dark m-3"
    :disabled="disabled"
    @click="goToPrevNext()"
  >
    <font-awesome-icon
      :icon="icon"
      size="2x"
    />
  </button>
</template>
<script setup>
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
const number = computed(() => parseInt(route.params.number));
const disabled = computed(() =>
  props.type === "next" ? number.value >= 499 : number.value <= 0
);

function goToPrevNext() {
  const newNumber = props.type === "next" ? number.value + 1 : number.value - 1;
  router.push({ name: "Template", params: { number: newNumber } });
}
</script>
