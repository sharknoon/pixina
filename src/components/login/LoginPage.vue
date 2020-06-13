<template>
  <div class="background">
    <div class="login-container p-4">
      <router-link to="/">
        <img
          id="login-logo"
          class="align-self-stretch mb-3"
          src="./../../assets/logo.svg"
          style="z-index: 3;"
        />
      </router-link>
      <h5 class="text-muted">Willkommen zurück</h5>
      <div>Hattest du einen schönen Tag?</div>
      <router-view class="mt-auto"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
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
.login-container {
  background: inherit;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  position: relative;
  background: inherit;
  overflow: hidden;
  z-index: 1;
}

.login-container:before {
  content: "";
  position: absolute;
  background: inherit;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
  filter: blur(10px);
  margin: -20px;
  z-index: -1;
}

.background {
  background: url("./../../assets/background.jpg") no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-bottom: 20vh;
  overflow: hidden;
}
</style>
