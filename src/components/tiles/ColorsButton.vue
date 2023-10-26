<template>
  <button class="btn btn-dark px-2" @click="showColors()">
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
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    </svg>
  </button>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  tileNumber: {
    type: Number,
    required: true
  }
})

function showColors() {
  router.push({
    name: 'ColorCount',
    query: { tiles: [props.tileNumber] }
  })
}
</script>
