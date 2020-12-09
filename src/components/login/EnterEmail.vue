<template>
  <div>
    <!-- Form for entering a email -->
    <form class="mt-4" @submit="checkEmail" novalidate="true">
      <div :class="{'input-group': $vuetify.breakpoint.mdAndUp}">
        <input
          type="email"
          v-model="email"
          class="form-control"
          :class="{ 'is-invalid': validationFailed }"
          placeholder="E-Mail-Adresse"
        />
        <div v-if="validationFailed && $vuetify.breakpoint.smAndDown" class="text-danger text-left">
          <small>Bitte eine gültige E-Mail-Adresse eingeben</small>
        </div>
        <div :class="{'input-group-append': $vuetify.breakpoint.mdAndUp}">
          <button
            class="btn btn-secondary"
            :class="{'btn-block mt-2': $vuetify.breakpoint.smAndDown}"
            type="submit"
          >
            <font-awesome-icon class="mr-2" :icon="['fas', 'envelope']" />Weiter mit E-Mail-Adresse
          </button>
        </div>
      </div>
      <div v-if="validationFailed && $vuetify.breakpoint.mdAndUp" class="text-danger text-left">
        <small>Bitte eine gültige E-Mail-Adresse eingeben</small>
      </div>
    </form>

    <!-- OR horizontal rule -->
    <NamedHorizontalRule text="ODER" class="mt-4"></NamedHorizontalRule>

    <!-- third party idendity provider -->
    <div class="row">
      <div class="col-md pb-0">
        <GoogleLogin
          class="third-party-login-button btn btn-large btn-block btn-primary"
          :params="{ client_id: this.$store.state.googleClientId }"
          :onSuccess="onSuccess"
          :onFailure="onFailure"
        >
          <font-awesome-icon class="mr-2" :icon="['fab', 'google']" />
          <small>Weiter mit Google</small>
        </GoogleLogin>
      </div>
      <div id="appleid-signin" class="col-md pb-0">
        <!-- Temporary span for using the tooltip on disabled elements -->
        <span tabindex="0" data-toggle="tooltip" title="Disabled tooltip">
          <button
            type="button"
            class="third-party-login-button btn btn-large btn-block btn-dark btn-apple disabled"
          >
            <font-awesome-icon class="mr-2" :icon="['fab', 'apple']" />
            <small>Weiter mit Apple</small>
          </button>
        </span>
      </div>
      <div class="col-md pb-0">
        <button
          type="button"
          class="third-party-login-button btn btn-large btn-block btn-light disabled"
        >
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
import NamedHorizontalRule from "../utils/NamedHorizontalRule";

export default {
  name: "EnterEmail",
  data() {
    return {
      validationFailed: false,
      email: this.$store.state.email
    };
  },
  components: {
    GoogleLogin,
    NamedHorizontalRule
  },
  methods: {
    onSuccess(/*googleUser*/) {
      this.$store.commit("setLoginState", "logged_in");
      this.$router.push("/");
    },
    onFailure(error) {
      console.error("Login attempt error: " + error);
    },
    checkEmail(form) {
      form.preventDefault();
      if (!this.email || !this.validEmail(this.email)) {
        this.validationFailed = true;
      } else {
        this.$store.commit("setEmailAddress", this.email);
        this.$store.commit("setLoginState", "email_entered_registered");
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
.third-party-login-button {
  min-width: 13rem;
}
</style>
