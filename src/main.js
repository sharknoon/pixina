// Vue
import Vue from 'vue'
// Vue Router
import router from '@/js/vue-router'
// Pixina
import Pixina from '@/Pixina.vue'
// Internationalization
import i18n from '@/js/i18n'
// Vuex
import store from '@/js/vuex'
// Bootstrap 
import '@/js/bootstrap'
// Fontawesome
import '@/js/fontawesome'
// Service Worker
import '@/js/registerServiceWorker'

new Vue({
    el: '#app',
    router: router,
    render: h => h(Pixina),
    i18n,
    store: store
})
