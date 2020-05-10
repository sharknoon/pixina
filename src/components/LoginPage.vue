<template>
  <div
    class="container d-flex flex-column justify-content-center align-items-start align-items-stretch text-left"
  >
    <img id="login-logo" class="mb-3" src="./../assets/logo.svg" />
    <h5 class="text-muted">Willkommen zurück</h5>
    <div>Hattest du einen schönen Tag?</div>
    <div v-if="this.$store.state.loginState == 0">
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
              class="btn btn-outline-secondary"
              type="submit"
              id="emailInput"
              @click="changeState(1)"
            >
              <font-awesome-icon class="mr-2" :icon="['fas', 'envelope']" />Weiter mit E-Mail-Adresse
            </button>
          </div>
          <div class="invalid-feedback">Bitte eine gültige E-Mail-Adresse eingeben</div>
        </div>
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
    <div v-if="this.$store.state.loginState == 1">
      <form class="needs-validation d-none d-md-block mt-4" novalidate>
        <div class="input-group">
          <input
            type="password"
            class="form-control"
            placeholder="Passwort"
            aria-label="Passwort"
            aria-describedby="passwordInput"
          />
          <div class="input-group-append">
            <button
              class="btn btn-primary"
              type="button"
              id="passwordInput"
              @click="changeState(99)"
            >
              <font-awesome-icon class="mr-2" :icon="['fas', 'arrow-right']" />Anmelden
            </button>
          </div>
          <div class="invalid-feedback">Das Passwort ist nicht korrekt</div>
        </div>
      </form>
      <form class="needs-validation d-md-none mt-4" novalidate>
        <input
          type="password"
          class="form-control mb-2"
          placeholder="Passwort"
          aria-label="Passwort"
          aria-describedby="passwordInput"
        />
        <div class="invalid-feedback">Das Passwort ist nicht korrekt</div>
        <button class="btn btn-block btn-primary" type="button" id="passwordInput">
          <font-awesome-icon class="mr-2" :icon="['fas', 'arrow-right']" />Anmelden
        </button>
      </form>
      <div class="row mt-4">
        <div class="col">
          <button class="btn btn-outline-secondary" @click="changeState(0)">Zurück</button>
        </div>
        <div class="col-auto">
          <button class="btn btn-link">Passwort vergessen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//Login Components
import GoogleLogin from "vue-google-login";

export default {
  name: "LoginDialog",
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
.abcRioButton.abcRioButtonLightBlue {
  margin: 0 auto;
}
#login-logo {
  max-height: 4rem;
}
.container {
  min-height: 100vh;
}
.btn-apple,
.btn-apple:hover,
.btn-apple:active,
.btn-apple:visited {
  background-color: #000000 !important;
}
</style>
