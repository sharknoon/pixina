<template>
  <div>
    <form class="needs-validation d-none d-md-block mt-4" novalidate>
      <div class="input-group">
        <input
          type="password"
          class="form-control"
          placeholder="Passwort"
          aria-label="Passwort"
          aria-describedby="passwordInput"
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="button" id="passwordInput" @click="changeState(99)">
            <font-awesome-icon class="mr-2" :icon="['fas', 'arrow-right']" />Anmelden
          </button>
        </div>
        <div class="invalid-feedback">Das Passwort ist nicht korrekt</div>
      </div>
    </form>
    <form class="needs-validation d-md-none mt-4" novalidate>
      <input
        type="password"
        class="form-control mb-2"
        placeholder="Passwort"
        aria-label="Passwort"
        aria-describedby="passwordInput"
      />
      <div class="invalid-feedback">Das Passwort ist nicht korrekt</div>
      <button class="btn btn-block btn-primary" type="button" id="passwordInput">
        <font-awesome-icon class="mr-2" :icon="['fas', 'arrow-right']" />Anmelden
      </button>
    </form>
    <div class="row mt-4">
      <div class="col">
        <button class="btn btn-outline-secondary" @click="changeState(0)">Zurück</button>
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
  mounted() {
    (function() {
      "use strict";
      window.addEventListener(
        "load",
        function() {
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.getElementsByClassName("needs-validation");
          // Loop over them and prevent submission
          /*var validation = */ Array.prototype.filter.call(forms, function(
            form
          ) {
            form.addEventListener(
              "submit",
              function(event) {
                if (form.checkValidity() === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
                form.classList.add("was-validated");
              },
              false
            );
          });
        },
        false
      );
    })();
  },
  methods: {
    changeState(newState) {
      this.$store.commit("setLoginState", newState);
    }
  }
};
</script>

<style>
</style>
