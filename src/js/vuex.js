///////////////////////////////////////////
//                Vuex                   //
///////////////////////////////////////////

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        // "logged_out" = enter email or single signin
        // "email_entered_registered" = enter password
        // "email_entered_unregistered" = register user details
        // "email_confirmation" = confirm email
        // "logged_in" = logged in
        loginState: "logged_out",
        // google
        // facebook
        // email
        identityProvier: null,
        // The E-Mail the user has entered
        email: null,
        // The user registration data
        first_name: null,
        last_name: null,
        hashed_password: null,
        // The Google clientId
        googleClientId: "861982955154-8dnmcg5ob5oih4af5ge0be64iv1mh9uv.apps.googleusercontent.com"
    },
    getters: {
        isLoggedIn: state => {
            return state.loginState == "logged_in"
        },
        isGoogleIdentityProvider: state => {
            return state.identityProvier == "google"
        }
    },
    mutations: {
        setLoginState(state, newState) {
            state.loginState = newState
        },
        setEmailAddress(state, email) {
            state.email = email
        },
        setIdentityProvier(state, provider) {
            state.identityProvier = provider
        }
    }
})