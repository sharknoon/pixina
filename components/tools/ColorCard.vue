<template>
  <div class="card position-relative h-100">
    <div class="flex-fill row g-0">
      <div
        class="col-3"
        :style="
          'background: ' +
          color.hex_place +
          '; border-radius: 0.25rem 0 0 0.25rem'
        "
      />
      <div class="col-9 d-flex flex-column">
        <div class="card-body">
          <h5 class="card-title">{{ $t(color.name_place) }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            {{ color.number_pixelhobby }}
          </h6>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style="height: 1.25rem; width: 1.25rem"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          {{
            $t(
              "amount-pixels",
              {
                amount: color.amount,
              },
              color.amount,
            )
          }}
          <div v-if="color.amount > 140" class="d-flex">
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
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            {{
              $t(
                "amount-colorplates",
                {
                  amount: Math.floor(color.amount / 140),
                },
                Math.floor(color.amount / 140),
              )
            }}
            +
            {{
              $t(
                "amount-pixels",
                {
                  amount: color.amount % 140,
                },
                color.amount % 140,
              )
            }}
          </div>
          <a
            href="#"
            class="btn btn-light position-absolute top-0 end-0 m-2"
            data-bs-toggle="modal"
            :data-bs-target="'#infoModal' + color.number_pixelhobby"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="height: 1.25rem; width: 1.25rem"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
        </div>
        <div class="card-footer p-2">
          <a
            href="#"
            class="btn btn-light"
            data-bs-toggle="modal"
            :data-bs-target="'#cuttingModal' + color.number_pixelhobby"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="height: 1.25rem; width: 1.25rem"
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
            {{ $t("cut") }}
          </a>
        </div>
      </div>
    </div>
    <ToolsInfoModal :color="color" />
    <ToolsCuttingModal :color="color" />
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
<style lang="scss" scoped>
.card {
  min-height: 12rem;
}
</style>
