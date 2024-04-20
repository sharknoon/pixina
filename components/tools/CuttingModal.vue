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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="me-1"
            style="height: 1.5rem; width: 1.5rem"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"
            />
          </svg>
          <h5 class="modal-title">{{ $t("cutting-information") }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <h5>
            {{
              $t(
                "amount-colorplates",
                { amount: Math.floor(color.amount / 140) },
                Math.floor(color.amount / 140),
              )
            }}
            +
          </h5>
          <ToolsColorPlate :color="color" />
          {{
            $t(
              "amount-pixels",
              { amount: color.amount % 140 },
              color.amount % 140,
            )
          }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  color: {
    type: Object,
    required: true,
  },
});
</script>
