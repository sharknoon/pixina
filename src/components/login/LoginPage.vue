<template>
  <div class="background">
    <div class="login-container p-4">
      <router-link to="/">
        <img
          id="login-logo"
          class="mb-2"
          src="./../../assets/images/logo.svg"
        />
      </router-link>
      <div class="m-3"></div>
      <h5 id="welcome-header">Willkommen zurück</h5>
      <div id="welcome-message">Hattest du einen schönen Tag?</div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

library.add(
  faGoogle
);

export default {
  name: "LoginPage",
  methods: {
    changeState(newState) {
      this.$store.commit("setLoginState", newState);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "node_modules/bootstrap/scss/functions";
@import "node_modules/bootstrap/scss/variables";
@import "node_modules/bootstrap/scss/mixins/_breakpoints";

#login-logo {
  max-height: 4.5rem;
}

.login-container {
  border-radius: 0.25rem;
  text-align: center;
  margin-bottom: 50%;
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.8);
}

@include media-breakpoint-up(sm) {
  .login-container {
    min-width: 35rem;
  }
}

@supports (backdrop-filter: none) {
  .login-container {
    backdrop-filter: blur(10px);
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.7);
  }
}

.background {
  background: url("./../../assets/images/background.webp") no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.min-width {
  min-width: 40rem;
}

#welcome-header,
#welcome-message {
  color: black;
}
</style>
