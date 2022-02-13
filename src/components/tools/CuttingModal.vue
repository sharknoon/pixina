<template>
  <div
    :id="'cuttingModal' + color.number_pixelhobby"
    class="modal fade"
    tabindex="-1"
    :aria-labelledby="'cuttingModal' + color.number_pixelhobby + 'Label'"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <font-awesome-icon
            :icon="['far', 'info-circle']"
            size="lg"
            class="align-middle mb-1 me-2"
          />
          <h5 class="modal-title">{{ t("cutting-information") }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <h5>
            {{ t("amount-colorplates", { amount: Math.floor(color.amount / 140) }, Math.floor(color.amount / 140)) }}
            +
          </h5>
          <ColorPlate :color="color" />
          {{ t("amount-pixels", { amount: color.amount % 140 }, color.amount % 140) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import ColorPlate from "@/components/tools/ColorPlate.vue";

const { t } = useI18n();

defineProps({
  color: {
    type: Object,
    required: true,
  }
})
</script>