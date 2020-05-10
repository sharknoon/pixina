// Vue
import Vue from 'vue'
// Vuex
import Vuex from 'vuex'
// Bootstrap 
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// Pixina 
import Pixina from './Pixina.vue'
// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

///////////////////////////////////////////
//             FontAwesome               //
///////////////////////////////////////////

import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

library.add(
  faEnvelope,
  faGoogle,
  faApple,
  faMicrosoft,
  faArrowRight
)

Vue.component('font-awesome-icon', FontAwesomeIcon)


///////////////////////////////////////////
//                Vuex                   //
///////////////////////////////////////////

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loginState: 0
  },
  mutations: {
    setLoginState(state, newState) {
      state.loginState = newState
    }
  }
})

///////////////////////////////////////////
//                 Vue                   //
///////////////////////////////////////////

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(Pixina),
  store: store
})