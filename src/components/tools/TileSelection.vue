<template>
  <div class="selection-wrapper h-100 d-flex flex-column">
    <div class="d-flex flex-wrap p-2 overflow-auto">
      <div
        v-for="tile in tiles"
        :key="tile"
        class="position-relative m-2"
        @click="toggleTileSelection($event, tile)"
      >
        <TileThumbnail
          :number="tile"
          :class="selected_tiles.includes(tile) ? 'thumbnail-selected' : ''"
        >
          <template #top-end>
            <Transition>
              <div v-if="selected_tiles.includes(tile)" class="p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style="height: 1.5rem; width: 1.5rem"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </Transition>
          </template>
        </TileThumbnail>
      </div>
    </div>

    <div class="p-4 d-flex align-items-center justify-content-between">
      <div>
        {{
          t(
            'tile-selection-counter',
            {
              amount: selected_tiles.length
            },
            selected_tiles.length
          )
        }}
      </div>
      <div>
        <button
          type="button"
          class="btn btn-primary"
          :disabled="selected_tiles.length < 1"
          @click="
            $router.push({
              name: 'ColorCount',
              query: { tiles: selected_tiles }
            })
          "
        >
          {{ t('next') }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TileThumbnail from '@/components/common/TileThumbnail.vue'

const { t } = useI18n()

const selected_tiles: Ref<number[]> = ref([])

const tiles: number[] = []
for (let number = 0; number < 500; number++) {
  tiles.push(number)
}

function toggleTileSelection(event: MouseEvent, number: number) {
  let fromNumber = number // inclusive
  let toNumber = number // inclusive

  if (event.shiftKey) {
    const last_selected_tile: number = selected_tiles.value[selected_tiles.value.length - 1]
    if (last_selected_tile < number) {
      fromNumber = last_selected_tile + 1
      toNumber = number
    } else {
      fromNumber = number
      toNumber = last_selected_tile - 1
    }
  }

  for (let number: number = fromNumber; number <= toNumber; number++) {
    const index: number = selected_tiles.value.indexOf(number)
    if (index >= 0) {
      selected_tiles.value.splice(index, 1)
    } else {
      selected_tiles.value.push(number)
    }
  }
}
</script>
<style lang="scss">
.selection-wrapper {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.thumbnail-selected img {
  filter: opacity(0.25);
}
</style>
