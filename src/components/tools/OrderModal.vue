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
          <h5 class="modal-title">
            Bestellen
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <label for="exampleFormControlInput1" class="form-label">Cart Cookie from pixelhobby-shop.de</label>
          <input type="text" class="form-control" placeholder="b7116d7da5b47de65afc8e83280fcb02" v-model="cartCookie">
          <small>Copy the value of the Cookie "cart" and paste it here in order to get your items added.</small>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="openShop">Shop öffnen</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="order">Zum Warenkorb hinzufügen</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
      cartCookie: "b7116d7da5b47de65afc8e83280fcb02"
    }
  },
  methods: {
    openShop(){
      window.open("https://pixelhobby-shop.de", "_blank");   
    },
    order() {
      let body = []
      this.colors.forEach(c => body.push({
        id: c.id_pixelhobby,
        quantity: Math.ceil(c.amount / 140)
      }));
      
      const requestOptions = {
        method: "POST",
        mode: "same-origin",
        headers: {
          'Content-Type': 'application/json',
          'Host': "pixina.app"
        },
        body: JSON.stringify(body)
      };
      fetch("https://pixina.app/api/v1/cart/" + this.cartCookie + "/add", requestOptions)
        .then(response => console.log(response));
    }
  }
};
</script>
<style lang="scss" scoped>
.table > :not(caption) > * > * {
  padding: 0;
}
</style>