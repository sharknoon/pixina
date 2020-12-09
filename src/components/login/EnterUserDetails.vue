<template>
  <div>
    <form class="mt-2 text-left" @submit="checkUserDetails" novalidate="true">
      <div class="form-row">
        <div class="col-md-6">
          <label for="firstNameInput">Vorname</label>
          <input
            v-model="first_name"
            type="text"
            id="firstNameInput"
            class="form-control"
            placeholder="z.B. Max"
          />
          <div v-if="firstNameValidationFailed" class="text-danger">
            <small>Der Vorname ist ungültig</small>
          </div>
        </div>

        <div class="col-md-6">
          <label for="lastNameInput">Nachname</label>
          <input
            v-model="last_name"
            type="text"
            id="lastNameInput"
            class="form-control"
            placeholder="z.B. Mustermann"
          />
          <div v-if="lastNameValidationFailed" class="text-danger">
            <small>Der Nachname ist ungültig</small>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="col-md-6 pb-0">
          <label for="passwortInput1">Passwort</label>
          <input
            v-model="password_1"
            type="password"
            id="passwortInput1"
            class="form-control"
            placeholder="Tipp: Nutze einen Passwort Manager!"
          />
        </div>

        <div class="col-md-6 pb-0">
          <label for="passwortInput2">Passwort wiederholen</label>
          <input
            v-model="password_2"
            type="password"
            id="passwortInput2"
            class="form-control"
            placeholder="Passwort muss identisch sein"
          />
        </div>
      </div>

      <div class="col-12 p-0 pb-2">
        <small
          v-if="!firstNameValidationFailed"
        >Mindestens 8 Zeichen, einen Groß- und Kleinbuchstaben und eine Zahl</small>
        <small v-else class="text-danger">Das Passwort ist zu kurz oder nicht identisch</small>
      </div>

      <!-- Buttons -->
      <div class="row text-left">
        <!-- Back Button -->
        <div class="col pb-0">
          <button class="btn btn-outline-secondary" @click="goBack">Zurück</button>
        </div>
        <!-- Register Button -->
        <div class="col-auto pb-0">
          <button class="btn btn-primary" type="submit">
            <font-awesome-icon class="mr-2" :icon="['fas', 'arrow-right']" />Registrieren
          </button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
const bcrypt = require("bcryptjs");

export default {
  name: "EnterUserDetails",
  data() {
    return {
      firstNameValidationFailed: false,
      lastNameValidationFailed: false,
      passwordValidationFailed: false,
      first_name: this.$store.state.first_name,
      last_name: this.$store.state.last_name,
      password_1: null,
      password_2: null
    };
  },
  computed: {
    hashed_password() {
      return bcrypt.hashSync(this.password_1);
    }
  },
  methods: {
    checkUserDetails(form) {
      form.preventDefault();
      var errors = false;
      if (!this.first_name || !this.validFirstName(this.first_name)) {
        this.firstNameValidationFailed = true;
        errors = true;
      }
      if (!this.last_name || !this.validLastName(this.last_name)) {
        this.lastNameValidationFailed = true;
        errors = true;
      }
      if (
        !this.password_1 ||
        !this.password_2 ||
        !this.validPassword(this.password_1, this.password_2)
      ) {
        this.passwordValidationFailed = true;
        errors = true;
      }
      if (!errors) {
        this.$store.commit("setLoginState", "email_confirmation");
        this.$router.push("/login/confirm-mail");
      }
    },
    validFirstName(name) {
      var valid = this.validName(name);
      this.firstNameValidationFailed = !valid;
      return valid;
    },
    validLastName(name) {
      var valid = this.validName(name);
      this.lastNameValidationFailed = !valid;
      return valid;
    },
    validName(name) {
      return /([A-Za-z0-9. -]+)/.test(name);
    },
    validPassword(password_1, password_2) {
      if (password_1 != password_2 || password_1.length < 6) {
        this.passwordValidationFailed = true;
        return false;
      } else {
        this.passwordValidationFailed = false;
        return true;
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>
