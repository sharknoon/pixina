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
        <div class="modal-content">
          <div class="modal-header">
            <h3>Anmelden</h3>
          </div>
          <div class="modal-body">
            <form method="post" action name="login_form">
              <p>
                <input type="text" class="span3" name="eid" id="email" placeholder="Email" />
              </p>
              <p>
                <input type="password" class="span3" name="passwd" placeholder="Password" />
              </p>
              <p>
                <button type="submit" class="btn btn-primary">Sign in</button>
                <a href="#">Forgot Password?</a>
              </p>
            </form>
          </div>
          <div class="modal-footer">
            Neu auf der Webseite?
            <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Google Login</GoogleLogin>
            <a href="#" class="btn btn-primary">Register</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';

export default {
        name: 'LoginDialog',
        data() {
            return {
                // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
                params: {
                    client_id: "861982955154-8dnmcg5ob5oih4af5ge0be64iv1mh9uv.apps.googleusercontent.com"
                },
                // only needed if you want to render the button with the google ui
                renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
                }
            }
        },
        components: {
            GoogleLogin
        },
        methods: {
          onSuccess(googleUser) {
            console.log('User logged in: ' + googleUser);
          },
          onFailure(error) {
            console.error('Login attempt error: ' + error);
          }
        }
    }
</script>
