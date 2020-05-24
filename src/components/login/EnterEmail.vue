<template>
  <div>
    <form class="d-none d-md-block mt-4" @submit="checkEmail" novalidate="true">
      <div class="input-group">
        <input type="email" v-model="email" class="form-control" placeholder="E-Mail-Adresse" />
        <div class="input-group-append">
          <button class="btn btn-secondary" type="submit">
            <font-awesome-icon class="mr-2" :icon="['fas', 'envelope']" />Weiter mit E-Mail-Adresse
          </button>
        </div>
      </div>
      <div v-if="!correctEmail">Bitte eine gültige E-Mail-Adresse eingeben</div>
    </form>
    <form class="needs-validation d-md-none mt-4" @submit="checkEmail" novalidate="true">
      <input type="email" v-model="email" class="form-control mb-2" placeholder="E-Mail-Adresse" />
      <div v-if="!correctEmail">Bitte eine gültige E-Mail-Adresse eingeben</div>
      <button class="btn btn-block btn-secondary" type="submit">
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
        <!-- Temporary span for using the tooltip on disabled elements -->
        <span tabindex="0" data-toggle="tooltip" title="Disabled tooltip">
          <button type="button" class="btn btn-lg btn-block btn-dark btn-apple disabled">
            <font-awesome-icon class="mr-2" :icon="['fab', 'apple']" />
            <small>Weiter mit Apple</small>
          </button>
        </span>
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
//Store to store general data
import Store from "@/store";

export default {
  name: "EnterEmail",
  data() {
    return {
      email: null,
      correctEmail: true,
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
  methods: {
    onSuccess(googleUser) {
      console.log("User logged in: " + googleUser);
    },
    onFailure(error) {
      console.error("Login attempt error: " + error);
    },
    changeLoginState(newState) {
      this.$store.commit("setLoginState", newState);
    },
    checkEmail(form) {
      form.preventDefault();
      if (!this.email || !this.validEmail(this.email)) {
        this.correctEmail = false;
      } else {
        console.log("correct")
        Store.email = this.email;
        this.$router.push("/login/enter-password");
      }
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
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
