<template>
  <div>
    <form class="d-none d-md-block mt-4" @submit="checkEmail" novalidate="true">
      <div class="input-group">
        <input
          type="email"
          v-model="email"
          class="form-control"
          :class="{ 'is-invalid': validationFailed }"
          placeholder="E-Mail-Adresse"
        />
        <div class="input-group-append">
          <button class="btn btn-secondary" type="submit">
            <font-awesome-icon class="mr-2" :icon="['fas', 'envelope']" />Weiter mit E-Mail-Adresse
          </button>
        </div>
      </div>
      <div v-if="validationFailed" class="text-danger">
        <small>Bitte eine gültige E-Mail-Adresse eingeben</small>
      </div>
    </form>
    <form class="d-md-none mt-4" @submit="checkEmail" novalidate="true">
      <input
        type="email"
        v-model="email"
        class="form-control"
        :class="{ 'is-invalid': validationFailed }"
        placeholder="E-Mail-Adresse"
      />
      <div v-if="validationFailed" class="text-danger">
        <small>Bitte eine gültige E-Mail-Adresse eingeben</small>
      </div>
      <button class="btn btn-block btn-secondary mt-2" type="submit">
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
          :params="{ client_id: this.$store.state.googleClientId }"
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

export default {
  name: "EnterEmail",
  data() {
    return {
      validationFailed: false
    };
  },
  computed: {
    email: {
      get() {
        return this.$store.state.email;
      },
      set(value) {
        this.$store.commit("setEmailAddress", value);
      }
    }
  },
  components: {
    GoogleLogin
  },
  methods: {
    onSuccess(/*googleUser*/) {
        this.$store.commit("setLoginState", 99);
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
        this.$store.commit("setLoginState", 1);
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
