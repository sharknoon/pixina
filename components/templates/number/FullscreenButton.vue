<template>
  <button class="btn btn-dark px-2" @click="toggleFullscreen()">
    <svg
      v-if="!state.isFullscreen"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      style="height: 1.5rem; width: 1.5rem"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
      />
    </svg>

    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      style="height: 1.5rem; width: 1.5rem"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
      />
    </svg>
  </button>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (event: "fullscreen", state: boolean): void;
}>();

const state = reactive({
  isFullscreen:
    typeof document === "undefined" ? false : !!document.fullscreenElement,
});

function toggleFullscreen() {
  if (typeof document === "undefined") return;
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      state.isFullscreen = true;
      emit("fullscreen", true);
    });
  } else if (document.exitFullscreen) {
    document.exitFullscreen().then(() => {
      state.isFullscreen = false;
      emit("fullscreen", false);
    });
  }
}
</script>
