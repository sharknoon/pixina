import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

const loginStore = new Vuex.Store({
  state: {
    loginState: 0
  },
  mutations: {
    enterEmail (state) {
      state.loginState = 0
    },
    enterPassword (state) {
      state.loginState = 1
    },
    enterRegistrationData (state) {
      state.loginState = 1
    }
  }
})

new Vue({
  render: h => h(App),
  store: loginStore
}).$mount('#app')

Vue.use(Vuex)