<template>
  <div id="place-wrapper" class="h-100 d-flex flex-column">
    <ZoomWrapper class="flex-grow-1" :src="placeUrl" />
    <div class="d-flex justify-content-between p-4">
      <div class="btn-group me-2" role="group" aria-label="Image type">
        <input
          id="btn-check-original"
          v-model="variant"
          type="radio"
          class="btn-check"
          autocomplete="off"
          value="original"
          checked
        />
        <label class="btn btn-outline-secondary" for="btn-check-original">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style="height: 1.25rem; width: 1.25rem"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          {{ t('original') }}
        </label>

        <input
          id="btn-check-cleaned"
          v-model="variant"
          type="radio"
          class="btn-check"
          autocomplete="off"
          value="cleaned"
        />
        <label class="btn btn-outline-secondary" for="btn-check-cleaned">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style="height: 1.25rem; width: 1.25rem"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
              clip-rule="evenodd"
            />
          </svg>
          {{ t('cleaned') }}
        </label>
      </div>
      <div>
        <input
          id="btn-check-grid"
          v-model="grid"
          type="checkbox"
          class="btn-check"
          autocomplete="off"
        />
        <label class="btn btn-secondary" for="btn-check-grid">
          <svg
            v-if="grid"
            xmlns="http://www.w3.org/2000/svg"
            style="height: 1.5rem; width: 1.5rem"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <svg
            v-else
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
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          {{ t('grid') }}
        </label>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ZoomWrapper from '@/components/common/ZoomWrapper.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const grid = ref(false)
const variant = ref('original')

const placeUrl = computed(() => {
  const fileName: string = variant.value + (grid.value ? '_grid' : '')
  return new URL(`../assets/images/place/${fileName}.webp`, import.meta.url).href
})

watch(variant, () => updateQueryParams())
watch(grid, () => updateQueryParams())

onMounted(() => readQueryParams())

function readQueryParams() {
  const variantQuery = route.query.variant
  if (variantQuery) {
    switch (variantQuery.toString().toLowerCase()) {
      case 'original':
        variant.value = 'original'
        break
      case 'cleaned':
        variant.value = 'cleaned'
        break
    }
  }
  const gridQuery = route.query.grid
  if (gridQuery) {
    switch (gridQuery.toString().toLowerCase()) {
      case 'true':
        grid.value = true
        break
      case 'false':
        grid.value = false
        break
    }
  }
}

function updateQueryParams() {
  const query: Record<string, string> = {}
  if (variant.value === 'cleaned') {
    query.variant = variant.value
  }
  if (grid.value) {
    query.grid = grid.value.toString()
  }
  router.replace({
    query: query
  })
}
</script>
