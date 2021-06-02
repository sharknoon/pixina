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
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <label class="form-label">
            {{ $t("pixelhobby-cookie") }}
          </label>
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
          <button type="button" class="btn btn-secondary" @click="openShop">
            {{ $t("open-shop") }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
            :disabled="!isValidCookie"
            @click="order"
          >
            {{ $t("add-to-cart") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from "bootstrap";

export default {
  name: "OrderModal",
  props: {
    colors: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      cartCookie: "",
      cartCookieRegex: new RegExp("^[a-f0-9]{32}$"),
    };
  },
  computed: {
    isValidCookie() {
      return this.cartCookieRegex.test(this.cartCookie);
    },
  },
  methods: {
    openShop() {
      window.open("https://pixelhobby-shop.de", "_blank");
    },
    order() {
      if (!this.isValidCookie) {
        return;
      }

      let body = this.colors.map((c) => {
        return {
          id: c.id_pixelhobby,
          quantity: Math.ceil(c.amount / 140),
        };
      });
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
        "https://pixina.app/api/v1/cart/" + this.cartCookie + "/add",
        requestOptions
      ).then((response) => console.log(response));
      new Modal(document.getElementById("orderModal")).hide();
    },
  },
};
</script>
<style lang="scss" scoped>
.table > :not(caption) > * > * {
  padding: 0;
}
</style>