import { createApp } from "vue";

import App from "@/App.vue";
import pinia from "@/pinia";
import router from "@/router";
import i18n from "@/i18n";
import fontawesomeicon from "@/fontawesome";
import { registerSW } from "virtual:pwa-register";

import "@/bootstrap";

registerSW({
  onOfflineReady() {
    console.log("[SW] Offline ready");
  },
});

createApp(App)
  .use(pinia)
  .use(router)
  .use(i18n)
  .component("font-awesome-icon", fontawesomeicon)
  .mount("#app");
