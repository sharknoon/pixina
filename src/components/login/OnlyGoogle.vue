<template>
  <div>
    <div class="m-4"></div>

    <div class="row">
      <div class="col-md pb-0">
        <GoogleLogin
          class="third-party-login-button btn btn-large btn-block btn-primary"
          :params="{ client_id: this.$store.state.googleClientId }"
          :onSuccess="onSuccess"
          :onFailure="onFailure"
        >
          <font-awesome-icon class="mr-2" :icon="['fab', 'google']" />
          <small>Anmelden mit Google</small>
        </GoogleLogin>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Google",
  data() {
    return {};
  },
  components: {
    GoogleLogin: () => import('vue-google-login')
  },
  methods: {
    onSuccess(/*googleUser*/) {
      this.$store.commit("setIdentityProvier", "google");
      this.$store.commit("setLoginState", 99);
      this.$router.push("/");
    },
    onFailure(error) {
      console.error("Login attempt error: " + JSON.stringify(error));
    },
    checkEmail(form) {
      form.preventDefault();
      if (!this.email || !this.validEmail(this.email)) {
        this.validationFailed = true;
      } else {
        this.$store.commit("setEmailAddress", this.email);
        this.$store.commit("setLoginState", 1);
        this.$router.push("/login/enter-password");
      }
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>

<style>
.btn-apple,
.btn-apple:hover,
.btn-apple:active,
.btn-apple:visited {
  background-color: #000000 !important;
}
.third-party-login-button {
  min-width: 13rem;
}
</style>
