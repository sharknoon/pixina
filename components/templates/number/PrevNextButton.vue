<template>
  <button
    class="btn text-white m-3 px-0"
    :disabled="disabled"
    @click="goToPrevNext()"
  >
    <svg
      v-if="props.type === 'next'"
      xmlns="http://www.w3.org/2000/svg"
      style="height: 2.5rem"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="6"
        stroke="#212529"
        d="M9 5l7 7-7 7"
      />
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      style="height: 2.5rem"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="6"
        stroke="#212529"
        d="M15 19l-7-7 7-7"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
</template>
<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const number = computed(() => {
  const paramNumber = route.params.number;
  if (Array.isArray(paramNumber)) {
    return parseInt(paramNumber[0]);
  } else {
    return parseInt(paramNumber);
  }
});
const disabled = computed(() =>
  props.type === "next" ? number.value >= 499 : number.value <= 0,
);

function goToPrevNext() {
  const newNumber = props.type === "next" ? number.value + 1 : number.value - 1;
  router.push("/templates/" + newNumber);
}
</script>
