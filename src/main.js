// Vue
import { createApp } from 'vue'
// Vue Router
import router from '@/js/vue-router'
// Pixina
import Pixina from '@/Pixina.vue'
// Internationalization
import i18n from '@/js/i18n'
// Pinia
import pinia from '@/stores'
// Bootstrap 
import '@/js/bootstrap'
// Fontawesome
import FontAwesomeIcon from '@/js/fontawesome'
// Service Worker
import '@/js/registerServiceWorker'

createApp(Pixina)
    .use(router)
    .use(i18n)
    .use(pinia)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
