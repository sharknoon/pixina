<template>
  <div
    class="modal fade"
    id="orderModal"
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
          <h5 class="modal-title">{{ $t("order") }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label class="form-label">{{ $t("pixelhobby-cookie") }}</label>
          <input
            type="text"
            class="form-control"
            :class="isValidCookie ? '' : 'is-invalid'"
            placeholder="b7116d7da5b47de65afc8e83280fcb02"
            v-model="cartCookie"
          />
          <div class="invalid-feedback">{{ $t("invalid-cookie") }}</div>
          <small>{{ $t("pixelhobby-cookie-description") }}</small>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="openShop">{{ $t("open-shop") }}</button>
          <button type="button" class="btn btn-primary" :disabled="!isValidCookie" @click="order">
            <div class="spinner-border spinner-border-sm me-1" role="status" v-if="apiLoading">
              <span class="visually-hidden">Loading...</span>
            </div>
            {{ $t("add-to-cart") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { Modal } from "bootstrap";
import tileInfos from "@/data/tile";

const props = defineProps({
  colors: {
    type: Array,
    required: true,
  },
  tiles: {
    type: Array,
    required: true,
  },
});

const cartCookie = ref("")
const cartCookieRegex = new RegExp("^[a-f0-9]{32}$")
const apiLoading = ref(false)

const isValidCookie = computed(() => cartCookieRegex.test(cartCookie.value))

function openShop() {
  window.open("https://pixelhobby-shop.de", "_blank");
}

function order() {
  if (!isValidCookie.value) {
    return;
  }

  apiLoading.value = true;
  let body = props.colors.map((c) => {
    return {
      id: c.id_pixelhobby,
      quantity: Math.ceil(c.amount / 140),
    };
  });
  let tile = {
    id: tileInfos.id_pixelhobby,
    quantity: props.tiles.length,
  };
  body.push(tile);
  console.log(JSON.stringify(body));

  const requestOptions = {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Host: "pixina.app",
    },
    body: JSON.stringify(body),
  };
  fetch(
    "https://pixina.app/api/v1/cart/" + cartCookie.value + "/add",
    requestOptions
  ).then((response) => {
    apiLoading.value = false;
    if (response.status >= 200 && response.status <= 299) {
      new Modal(document.getElementById("orderModal")).hide();
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