<template>
  <div>
    <div class="m-4"></div>

    <div class="row">
      <div class="col-md pb-0">
        <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
          <font-awesome-icon class="mr-2" :icon="['fab', 'google']" />
          <small>Anmelden mit Facebook</small>
        </fb:login-button>
      </div>
    </div>
  </div>
</template>


<script>
//Login Component
export default {
  name: "Facebook",
  data() {},
  components: {
    GoogleLogin,
  },
  mounted() {
    window.fbAsyncInit = function () {
      FB.init({
        appId: "280150016696502",
        cookie: true,
        xfbml: true,
        version: "v8.0",
      });

      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    // Check if user is already signed in, if so redirect him
    FB.getLoginStatus(function (response) {
      if (response.status == "connected") {
        this.$store.commit("setLoginState", "logged_in");
        this.$router.push("/");
      }
    });
  },
  methods: {
    checkLoginState: function () {
      FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
      });
    },
  },
};
</script>

<style>
.btn-apple,
.btn-apple:hover,
.btn-apple:active,
.btn-apple:visited {
  background-color: #000000 !important;
}
.third-party-login-button {
  min-width: 13rem;
}
</style>
