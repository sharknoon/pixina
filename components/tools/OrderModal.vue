<template>
  <div
    id="orderModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="orderModalLabel"
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h5 class="modal-title">{{ $t("order") }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <label class="form-label">{{ $t("pixelhobby-cookie") }}</label>
          <input
            v-model="cartCookie"
            type="text"
            class="form-control"
            :class="isValidCookie ? '' : 'is-invalid'"
            placeholder="Z2NwLWV1cm9wZS13ZXN0MzowMUoyWFRGNk1UMDBWOVdOQlA0ODNNVlY3UQ%3Fkey%3De10a064a10bc06e3bc7bc249135530a8"
          />
          <div class="invalid-feedback">{{ $t("invalid-cookie") }}</div>
          <small>{{ $t("pixelhobby-cookie-description") }}</small>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="openShop">
            {{ $t("open-shop") }}
          </button>
          <ClientOnly>
            <button
              type="button"
              class="btn btn-primary"
              :disabled="cartCookie.length < 75"
              @click="order"
            >
              <div
                v-if="apiLoading"
                class="spinner-border spinner-border-sm me-1"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              {{ $t("add-to-cart") }}
            </button>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { $bootstrap } = useNuxtApp();
const runtimeConfig = useRuntimeConfig();

interface Color {
  amount?: number;
  name_place: string;
  name_pixelhobby: string;
  hex_place: string;
  hex_pixelhobby: string;
  number_place: number;
  number_pixelhobby: number;
  id_pixelhobby: number;
}

const props = defineProps<{
  colors: Color[];
  tiles: number[];
}>();

const cartCookie = ref("");
const apiLoading = ref(false);

const isValidCookie = computed(() => cartCookie.value.length === 99);

function openShop() {
  window.open("https://pixelhobby-shop.de", "_blank");
}

async function order() {
  apiLoading.value = true;
  const body = props.colors.map((c: Color) => {
    return {
      id: c.id_pixelhobby,
      quantity: Math.ceil((c.amount || 0) / 140),
    };
  });
  const baseplates = {
    id: runtimeConfig.public.pixelhobbyTileId,
    quantity: props.tiles.length,
  };
  body.push(baseplates);

  const { status } = await useFetch<string>(
    `/api/v1/cart/${cartCookie.value}/add`,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
  );

  apiLoading.value = false;
  if (status.value === "success") {
    new $bootstrap.Modal("#orderModal").hide();
  }
}
</script>
<style lang="scss" scoped>
.table > :not(caption) > * > * {
  padding: 0;
}
</style>
