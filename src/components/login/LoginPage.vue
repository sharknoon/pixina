<template>
  <div
    class="container d-flex flex-column justify-content-center text-left"
  >
    <div class="login-container">
      <img id="login-logo" class="align-self-stretch mb-3" src="./../../assets/logo.svg" />
      <h5 class="text-muted">Willkommen zurück</h5>
      <div>Hattest du einen schönen Tag?</div>
      <div v-if="this.$store.state.loginState == 0">
        <EnterEmail />
      </div>
      <div v-if="this.$store.state.loginState == 1">
        <EnterPassword />
      </div>
    </div>
  </div>
</template>

<script>
import EnterEmail from "./EnterEmail";
import EnterPassword from "./EnterPassword";

export default {
  name: "LoginPage",
  components: {
    EnterEmail,
    EnterPassword
  },
  methods: {
    changeState(newState) {
      this.$store.commit("setLoginState", newState);
    }
  }
};
</script>

<style>
#login-logo {
  max-height: 4rem;
}
.container {
  min-height: 100vh;
}
.login-container {
  min-height: 30rem;
}
body {
  background: url('https://source.unsplash.com/twukN12EN7c/1920x1080') no-repeat center center fixed;
}
</style>
