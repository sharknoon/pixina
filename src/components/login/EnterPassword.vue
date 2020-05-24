<template>
  <div>
    <form class="d-none d-md-block mt-4" @submit="login" novalidate="true">
      <div class="input-group">
        <input type="password" v-model="password" class="form-control" placeholder="Passwort" />
        <div class="input-group-append">
          <button class="btn btn-primary" type="submit">
            <font-awesome-icon class="mr-2" :icon="['fas', 'arrow-right']" />Anmelden
          </button>
        </div>
        <div class="invalid-feedback">Das Passwort ist nicht korrekt</div>
      </div>
    </form>
    <form class="d-md-none mt-4" @submit="login" novalidate="true">
      <input type="password" class="form-control mb-2" placeholder="Passwort" />
      <div class="invalid-feedback">Das Passwort ist nicht korrekt</div>
      <button class="btn btn-block btn-primary" type="submit">
        <font-awesome-icon class="mr-2" :icon="['fas', 'arrow-right']" />Anmelden
      </button>
    </form>
    <div class="row mt-4">
      <div class="col">
        <button class="btn btn-outline-secondary" @click="goBack">Zurück</button>
      </div>
      <div class="col-auto">
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
      password: null
    };
  },
  methods: {
    changeState(newState) {
      this.$store.commit("setLoginState", newState);
    },
    login(form) {
      form.preventDefault();
      //let email = this.$store.state.email
      //TODO actual login
      //api(email, password)
      this.$store.commit("setLoginState", 99);
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
