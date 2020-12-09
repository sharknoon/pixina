<template>
  <div>
    <!-- Form for entering a email -->
    <form class="mt-4" @submit="login" novalidate="true">
      <div :class="{'input-group': $vuetify.breakpoint.mdAndUp}">
        <input
          type="password"
          v-model="password"
          class="form-control"
          :class="{ 'is-invalid': validationFailed }"
          placeholder="Passwort"
        />
        <div v-if="validationFailed && $vuetify.breakpoint.smAndDown" class="text-danger">
          <small>Bitte überprüfe dein Passwort</small>
        </div>
        <div :class="{'input-group-append': $vuetify.breakpoint.mdAndUp}">
          <button
            class="btn btn-secondary"
            :class="{'btn-block mt-2': $vuetify.breakpoint.smAndDown}"
            type="submit"
          >
            <font-awesome-icon class="mr-2" :icon="['fas', 'arrow-right']" />Anmelden
          </button>
        </div>
      </div>
      <div v-if="validationFailed && $vuetify.breakpoint.mdAndUp" class="text-danger">
        <small>Bitte überprüfe dein Passwort</small>
      </div>
    </form>

    <div class="m-4" />

    <!-- Buttons -->
    <div class="row text-left">
      <!-- Back Button -->
      <div class="col py-0">
        <button class="btn btn-outline-secondary" @click="goBack">Zurück</button>
      </div>
      <!-- Reset Password Button -->
      <div class="col-auto py-0">
        <button class="btn btn-link">Passwort vergessen</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "EnterPassword",
  data() {
    return {
      password: null,
      validationFailed: false
    };
  },
  methods: {
    login(form) {
      form.preventDefault();
      //let email = this.$store.state.email
      //TODO actual login
      //api(email, password)
      this.$store.commit("setLoginState", "logged_in");
      this.$router.push("/");
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>
