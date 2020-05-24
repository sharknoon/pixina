<template>
  <div>
    <form class="mt-4" @submit="checkEmail" novalidate="true">
      <div class="form-row">
        <div class="col-md-6">
          <input type="text" class="form-control" placeholder="Vorname" />
        </div>
        <div v-if="firstNameValidationFailed" class="text-danger">
          <small>Der Vorname ist ungültig</small>
        </div>
        <div class="col-md-6 mt-2 mt-md-0">
          <input type="text" class="form-control" placeholder="Nachname" />
        </div>
        <div v-if="lastNameValidationFailed" class="text-danger">
          <small>Der Nachname ist ungültig</small>
        </div>
      </div>
      
    </form>
  </div>
</template>


<script>
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
