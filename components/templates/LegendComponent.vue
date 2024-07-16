<template>
  <div class="d-flex justify-content-center gap-4 mb-3 mt-1">
    <div v-for="(item, i) in items" :key="i" class="d-flex gap-2">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="item.icon" />
      {{ $t(item.name) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Progress } from "~/types/progress";

const { status, data } = await useLazyFetch<Progress>("/api/v1/progress");

const items = computed(() =>
  [
    {
      name: "finished",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16">
             <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
           </svg>`,
      display:
        status.value === "success" && (data?.value?.finished.length ?? 0) > 0,
    },
    {
      name: "in-progress",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16">
             <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
           </svg>`,
      display:
        status.value === "success" && (data?.value?.inProgress.length ?? 0) > 0,
    },
    {
      name: "reserved",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
             <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
           </svg>`,
      display:
        status.value === "success" && (data?.value?.reserved.length ?? 0) > 0,
    },
  ].filter((item) => item.display),
);
</script>
