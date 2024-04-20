<template>
  <button class="btn btn-dark px-2" @click="close()">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style="height: 1.5rem; width: 1.5rem"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</template>
<script setup lang="ts">
const router = useRouter();

function close() {
  router.push("/templates");
}
</script>
