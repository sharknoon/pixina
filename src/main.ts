import { createApp } from "vue";

import Pixina from "@/Pixina.vue";
import pinia from "@/pinia";
import router from "@/router";
import i18n from "@/i18n";
import fontawesomeicon from "@/fontawesome";

import "@/bootstrap";

createApp(Pixina)
    .use(pinia)
    .use(router)
    .use(i18n)
    .component('font-awesome-icon', fontawesomeicon)
    .mount("#app");
