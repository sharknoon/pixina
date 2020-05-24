<template>
  <div>
    <form class="needs-validation d-none d-md-block mt-4" novalidate>
      <div class="input-group">
        <input
          type="email"
          class="form-control"
          placeholder="E-Mail-Adresse"
          aria-label="E-Mail-Adresse"
          aria-describedby="emailInput"
          required
        />
        <div class="input-group-append">
          <button
            class="btn btn-secondary"
            type="submit"
            id="emailInput"
            
          >
            <font-awesome-icon class="mr-2" :icon="['fas', 'envelope']" />Weiter mit E-Mail-Adresse
          </button>
        </div>
      </div>
      <div class="invalid-feedback">Bitte eine gültige E-Mail-Adresse eingeben</div>
    </form>
    <form class="needs-validation d-md-none mt-4" novalidate>
      <input
        type="email"
        class="form-control mb-2"
        placeholder="E-Mail-Adresse"
        aria-label="E-Mail-Adresse"
        aria-describedby="emailInput"
        required
      />
      <div class="invalid-feedback">Bitte eine gültige E-Mail-Adresse eingeben</div>
      <button
        class="btn btn-block btn-secondary"
        type="submit"
        id="emailInput"
        @click="changeState(1)"
      >
        <font-awesome-icon class="mr-2" :icon="['fas', 'envelope']" />Weiter mit E-Mail-Adresse
      </button>
    </form>
    <div class="d-flex align-items-center my-2">
      <hr class="w-100" />
      <div class="text-muted mx-3">
        <small>ODER</small>
      </div>
      <hr class="w-100" />
    </div>
    <div class="row">
      <div class="col-md mb-2">
        <GoogleLogin
          class="btn btn-lg btn-block btn-primary"
          :params="params"
          :onSuccess="onSuccess"
          :onFailure="onFailure"
        >
          <font-awesome-icon class="mr-2" :icon="['fab', 'google']" />
          <small>Weiter mit Google</small>
        </GoogleLogin>
      </div>
      <div id="appleid-signin" class="col-md mb-2">
        <button type="button" class="btn btn-lg btn-block btn-dark btn-apple disabled">
          <font-awesome-icon class="mr-2" :icon="['fab', 'apple']" />
          <small>Weiter mit Microsoft</small>
        </button>
      </div>
      <div class="col-md mb-2">
        <button type="button" class="btn btn-lg btn-block btn-light disabled">
          <font-awesome-icon class="mr-2" :icon="['fab', 'microsoft']" />
          <small>Weiter mit Microsoft</small>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
//Login Components
import GoogleLogin from "vue-google-login";

export default {
  name: "EnterEmail",
  data() {
    return {
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
        client_id:
          "861982955154-8dnmcg5ob5oih4af5ge0be64iv1mh9uv.apps.googleusercontent.com"
      }
    };
  },
  components: {
    GoogleLogin
  },
  mounted() {
    (function() {
      "use strict";
      window.addEventListener(
        "load",
        function() {
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.getElementsByClassName("needs-validation");
          // Loop over them and prevent submission
          /*var validation = */ Array.prototype.filter.call(forms, function(
            form
          ) {
            form.addEventListener(
              "submit",
              function(event) {
                if (form.checkValidity() === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
                form.classList.add("was-validated");
              },
              false
            );
          });
        },
        false
      );
    })();
  },
  methods: {
    onSuccess(googleUser) {
      console.log("User logged in: " + googleUser);
    },
    onFailure(error) {
      console.error("Login attempt error: " + error);
    },
    changeState(newState) {
      this.$store.commit("setLoginState", newState);
    }
  }
};
</script>

<style>
.btn-apple,
.btn-apple:hover,
.btn-apple:active,
.btn-apple:visited {
  background-color: #000000 !important;
}
</style>
