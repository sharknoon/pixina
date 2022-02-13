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
          <font-awesome-icon
            :icon="['far', 'shopping-cart']"
            size="lg"
            class="align-middle mb-1 me-2"
          />
          <h5 class="modal-title">{{ t("order") }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <label class="form-label">{{ t("pixelhobby-cookie") }}</label>
          <input
            v-model="cartCookie"
            type="text"
            class="form-control"
            :class="isValidCookie ? '' : 'is-invalid'"
            placeholder="b7116d7da5b47de65afc8e83280fcb02"
          />
          <div class="invalid-feedback">{{ t("invalid-cookie") }}</div>
          <small>{{ t("pixelhobby-cookie-description") }}</small>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="openShop">
            {{ t("open-shop") }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
            :disabled="!isValidCookie"
            @click="order"
          >
            <div
              v-if="apiLoading"
              class="spinner-border spinner-border-sm me-1"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            {{ t("add-to-cart") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Modal } from "bootstrap";
import tileInfos from "@/data/tile.json";

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

const { t } = useI18n();

const props = defineProps<{
  colors: Color[];
  tiles: number[];
}>();

const cartCookie = ref("");
const cartCookieRegex = new RegExp("^[a-f0-9]{32}$");
const apiLoading = ref(false);

const isValidCookie = computed(() => cartCookieRegex.test(cartCookie.value));

function openShop() {
  window.open("https://pixelhobby-shop.de", "_blank");
}

function order() {
  if (!isValidCookie.value) {
    return;
  }

  apiLoading.value = true;
  let body = props.colors.map((c: Color) => {
    return {
      id: c.id_pixelhobby,
      quantity: Math.ceil((c.amount || 0) / 140),
    };
  });
  let tile = {
    id: tileInfos.id_pixelhobby,
    quantity: props.tiles.length,
  };
  body.push(tile);
  console.log(JSON.stringify(body));

  // eslint-disable-next-line no-undef
  const requestOptions: RequestInit = {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Host: "pixina.app",
    },
    body: JSON.stringify(body),
  };
  fetch(
    `https://pixina.app/api/v1/cart/${cartCookie.value}/add`,
    requestOptions
  ).then((response: Response) => {
    apiLoading.value = false;
    if (response.status >= 200 && response.status <= 299) {
      const modalElement = document.getElementById("orderModal");
      if (modalElement) {
        new Modal(modalElement).hide();
      }
    }
    console.log(response);
  });
}
</script>
<style lang="scss" scoped>
.table > :not(caption) > * > * {
  padding: 0;
}
</style>
