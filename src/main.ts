import { createApp } from "vue";

import App from "@/App.vue";
import pinia from "@/pinia";
import router from "@/router";
import i18n from "@/i18n";
import "@/index.css";
import "@/bootstrap";

createApp(App).use(pinia).use(router).use(i18n).mount("#app");
