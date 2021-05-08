<template>
  <div
    class="modal fade"
    :id="'cuttingModal' + color.number_pixelhobby"
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
          <h5 class="modal-title">
            {{ $t("cutting-information") }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h5>
            {{
              $tc("amount-colorplates", Math.floor(color.amount / 140), {
                amount: Math.floor(color.amount / 140),
              })
            }}
            +
          </h5>
          <ColorPlate :color="color" />
          {{
            $tc("amount-pixels", color.amount % 140, {
              amount: color.amount % 140,
            })
          }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ColorPlate from "./ColorPlate";

export default {
  name: "CuttingModal",
  props: {
    color: {
      type: Object,
      required: true,
    },
  },
  components: {
    ColorPlate,
  },
};
</script>