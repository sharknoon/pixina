<template>
  <div class="container d-flex flex-column justify-content-center align-items-start text-left">
    <img id="login-logo" class="mb-5" src="./../assets/logo.svg" />
    <h5 class="text-muted">Willkommen zurück</h5>Hattest du einen schönen Tag?
    <div v-if="loginStore.state.loginState == 0">
      <form class="align-self-stretch mt-4">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Email-Adresse"
            aria-label="Email-Adresse"
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            <button class="btn btn-primary" type="button">Weiter</button>
          </div>
        </div>
      </form>
      <hr class />
      <div class="d-flex justify-content-start align-items-center align-self-stretch">
        <GoogleLogin
          class="mr-2"
          :params="params"
          :renderParams="renderParams"
          :onSuccess="onSuccess"
          :onFailure="onFailure"
        />
        <button class="btn btn-light mr-2">Sign in With Microsoft</button>
        <button class="btn btn-dark">Sign in With Apple</button>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";

export default {
  name: "LoginDialog",
  data() {
    return {
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
        client_id:
          "861982955154-8dnmcg5ob5oih4af5ge0be64iv1mh9uv.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    };
  },
  components: {
    GoogleLogin
  },
  methods: {
    onSuccess(googleUser) {
      console.log("User logged in: " + googleUser);
    },
    onFailure(error) {
      console.error("Login attempt error: " + error);
    }
  }
};
</script>

<style>
.abcRioButton.abcRioButtonLightBlue {
  margin: 0 auto;
}
#login-logo {
  max-height: 3rem;
}
.container {
  min-height: 100vh;
}
</style>
