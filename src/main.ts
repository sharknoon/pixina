import { createApp } from "vue";

import App from "@/App.vue";
import pinia from "@/pinia";
import router from "@/router";
import i18n from "@/i18n";
import "@/bootstrap";

caches.keys().then((names) => names.forEach((name) => caches.delete(name)));

createApp(App).use(pinia).use(router).use(i18n).mount("#app");
