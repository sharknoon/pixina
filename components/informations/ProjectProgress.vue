<template>
  <div class="position-relative">
    <div
      v-if="status === 'success'"
      class="container d-flex flex-column justify-content-center h-100 my-4"
    >
      <h1 class="display-1 text-center mb-0 lh-1">
        {{ (data?.finished.length ?? 0) / 5 }}%
      </h1>
      <h5 class="text-center mb-0">{{ $t("finished") }}</h5>
      <small class="text-center mb-4">
        {{ data?.finished.length ?? 0 }} / 500 {{ $t("tiles") }}
      </small>

      <div
        class="progress rounded-pill overflow-visible"
        style="height: 2.5rem"
        @mouseleave="currentMouseOver = -1"
      >
        <div
          v-for="(p, i) of tileProgress"
          :key="i"
          :class="p.classes"
          class="progress-bar position-relative overflow-visible"
          role="progressbar"
          :style="`width: ${p.progress / 5}%; ${p.styles}; overflow-x: clip !important`"
          :aria-valuenow="p.progress"
          aria-valuemin="0"
          aria-valuemax="100"
          @mouseover="currentMouseOver = i"
        >
          {{ p.progress / 5 }}%
          <Transition>
            <div
              v-if="currentMouseOver === i"
              style="z-index: 100; translate: 0 -50%"
              class="position-absolute start-50 translate-middle bg-black text-white px-3 py-1 rounded"
            >
              {{ p.progress }} {{ $t("tiles") }}
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                style="margin-top: 0.1rem"
                class="position-absolute top-100 start-50 translate-middle"
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                />
              </svg>
            </div>
          </Transition>
        </div>
      </div>

      <div class="d-flex justify-content-around mt-3">
        <div v-for="(p, i) of tileProgress" :key="i">
          <div
            :class="p.classes"
            class="d-inline-block ratio ratio-1x1"
            style="width: 1rem; height: 1rem"
          />
          {{ $t(p.text) }}
        </div>
      </div>
    </div>

    <div
      v-else-if="status === 'pending'"
      class="position-absolute top-0 end-0 bottom-0 start-0 bg-white text-bg-white d-flex justify-content-center align-items-center"
    >
      <div class="spinner-grow text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Progress } from "~/types/progress";
const { status, data } = await useLazyFetch<Progress>("/api/v1/progress");

const currentMouseOver = ref<number>();

const tileProgress = computed(() => {
  const progress = [
    {
      classes: "bg-success text-bg-success",
      styles: "",
      text: "finished",
      progress: data?.value?.finished.length ?? 0,
    },
    {
      classes: "bg-primary text-bg-primary",
      styles: "",
      text: "in-progress",
      progress: data?.value?.inProgress.length ?? 0,
    },
    {
      classes: "bg-danger text-bg-danger",
      styles: "",
      text: "reserved",
      progress: data?.value?.reserved.length ?? 0,
    },
    {
      classes: "bg-warning text-bg-warning",
      styles: "",
      text: "available-in-stock",
      progress: data?.value?.availableInStock.length ?? 0,
    },
    {
      classes: "bg-info text-bg-info",
      styles: "",
      text: "available-out-of-stock",
      progress: data?.value?.availableOutOfStock.length ?? 0,
    },
  ].filter((p) => p.progress > 0);
  // Add border radius to first and last element
  if (progress.length > 0) {
    progress[0].styles = "border-radius: 50rem 0 0 50rem;";
    progress[progress.length - 1].styles = "border-radius: 0 50rem 50rem 0;";
  }
  return progress;
});
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
