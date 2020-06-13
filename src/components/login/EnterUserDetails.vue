<template>
  <div>
    <form class="mt-4" @submit="checkEmail" novalidate="true">
      <div class="form-row">
        <div class="col-md-6">
          <label for="firstNameInput">Vorname</label>
          <input type="text" id="firstNameInput" class="form-control" placeholder="z.B. Max" />
          <div v-if="firstNameValidationFailed" class="text-danger">
            <small>Der Vorname ist ungültig</small>
          </div>
        </div>

        <div class="col-md-6">
          <label for="lastNameInput">Nachname</label>
          <input type="text" id="lastNameInput" class="form-control" placeholder="z.B. Mustermann" />
          <div v-if="lastNameValidationFailed" class="text-danger">
            <small>Der Nachname ist ungültig</small>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="col-md-6">
          <label for="passwortInput1">Passwort</label>
          <input type="password" id="passwortInput1" class="form-control" placeholder="Tipp: Nutze einen Passwort Manager!" />
          <div  >
            <small v-if="firstNameValidationFailed" class="text-danger">Das Passwort ist zu kurz</small>
            <small v-else>Mindestens 8 Zeichen, einen Groß- und Kleinbuchstaben und eine Zahl</small>
          </div>
        </div>

        <div class="col-md-6">
          <label for="passwortInput2">Passwort erneut eingeben</label>
          <input type="password" id="passwortInput2" class="form-control" placeholder="Passwort muss identisch sein" />
          <div v-if="lastNameValidationFailed" class="text-danger">
            <small>Das Passwort ist nicht identisch</small>
          </div>
        </div>
      </div>
    </form>

    <!-- Buttons -->
    <div class="row mt-4">
      <!-- Back Button -->
      <div class="col">
        <button class="btn btn-outline-secondary" @click="goBack">Zurück</button>
      </div>
      <!-- Register Button -->
      <div class="col-auto">
        <button class="btn btn-primary"><font-awesome-icon class="mr-2" :icon="['fas', 'arrow-right']" />Registrieren</button>
      </div>
    </div>
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
    },
    goBack() {
      this.$router.go(-1);
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
