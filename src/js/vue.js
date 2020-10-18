///////////////////////////////////////////
//                 Vue                   //
///////////////////////////////////////////

// Vue
import Vue from 'vue'
// Vue Router
import router from '@/js/vue-router'
//Pixina
import Pixina from '@/Pixina.vue'
//Vuetify
import vuetify from '@/plugins/vuetify'
//Vuex
import store from '@/js/vuex'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: router,
  render: h => h(Pixina),
  vuetify,
  store: store
})
