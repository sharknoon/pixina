<template>
  <div class="selection-wrapper h-100 d-flex flex-column">
    <div class="d-flex flex-wrap p-2 overflow-auto">
      <div
        v-for="tile in tiles"
        :key="tile"
        ref="thumbnails"
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
                <font-awesome-icon :icon="['fas', 'check-circle']" size="lg" />
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
            "tile-selection-counter",
            {
              amount: selected_tiles.length,
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
              query: { tiles: selected_tiles },
            })
          "
        >
          {{ t("next") }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, type Ref } from "vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import TileThumbnail from "@/components/common/TileThumbnail.vue";

const { t } = useI18n();

const selected_tiles: Ref<number[]> = ref([]);

const tiles: number[] = [];
for (let number = 0; number < 500; number++) {
  tiles.push(number);
}

function toggleTileSelection(event: MouseEvent, number: number) {
  let fromNumber = number; // inclusive
  let toNumber = number; // inclusive

  if (event.shiftKey) {
    let last_selected_tile: number =
      selected_tiles.value[selected_tiles.value.length - 1];
    if (last_selected_tile < number) {
      fromNumber = last_selected_tile + 1;
      toNumber = number;
    } else {
      fromNumber = number;
      toNumber = last_selected_tile - 1;
    }
  }

  for (let number: number = fromNumber; number <= toNumber; number++) {
    let index: number = selected_tiles.value.indexOf(number);
    if (index >= 0) {
      selected_tiles.value.splice(index, 1);
    } else {
      selected_tiles.value.push(number);
    }
  }
}

const observer = new IntersectionObserver((entries, self) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target.getElementsByTagName("img")[0];
      img?.setAttribute("src", img?.getAttribute("data-src") || "");
      self.unobserve(entry.target);
    }
  });
});
const thumbnails = ref<HTMLElement[]>([]);

onMounted(() => {
  thumbnails.value.forEach((thumbnail) =>
    thumbnail ? observer.observe(thumbnail) : null
  );
});
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
