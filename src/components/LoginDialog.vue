<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#exampleModal"
    >Launch demo modal</button>
    <div class="modal hide" id="exampleModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content text-left">
          <div class="modal-header">
            <h3>Anmelden</h3>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="emailInput">Email-Adresse</label>
                <input
                  type="email"
                  class="form-control"
                  id="emailInput"
                  aria-describedby="emailHelp"
                  placeholder="Email-Adresse"
                />
              </div>
              <div class="form-group">
                <label for="passwordInput">Passwort</label>
                <input
                  type="password"
                  class="form-control"
                  id="passwordInput"
                  placeholder="Passwort"
                />
              </div>
              <div class="form-check mb-3">
                <input type="checkbox" class="form-check-input" id="stayLoggedInInput" />
                <label class="form-check-label" for="stayLoggedInInput">Angemeldet bleiben</label>
              </div>
              <button type="submit" class="btn btn-primary">Anmelden</button>
            </form>
            <hr/>
            <div>
              <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure">Google Login</GoogleLogin>
            </div>
          </div>
          <div class="modal-footer">
            Neu auf der Webseite?
            <a href="#" class="btn btn-primary">Registrieren</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";

export default {
  name: "LoginDialog",
  data() {
    return {
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
        client_id:
          "861982955154-8dnmcg5ob5oih4af5ge0be64iv1mh9uv.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    };
  },
  components: {
    GoogleLogin
  },
  methods: {
    onSuccess(googleUser) {
      console.log("User logged in: " + googleUser);
    },
    onFailure(error) {
      console.error("Login attempt error: " + error);
    }
  }
};
</script>

<style>
.abcRioButton.abcRioButtonLightBlue { 
  margin: 0 auto;
}
</style>
