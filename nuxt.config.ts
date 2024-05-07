// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["bootstrap/dist/css/bootstrap.min.css", "/assets/main.css"],
  runtimeConfig: {
    public: {
      apiUrl: "", // can be overwritten by NUXT_PUBLIC_API_URL environment variable
      pixelhobbyTileId: 35007450218648, // can be overwritten by NUXT_PUBLIC_PIXELHOBBY_TILE_ID environment variable
    },
  },
  modules: [
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/eslint",
  ],
  i18n: {
    strategy: "no_prefix",
    locales: [
      {
        code: "en-US",
        name: "English (United States)",
        file: "en-US.json",
      },
      {
        code: "de-DE",
        name: "Deutsch (Deutschland)",
        file: "de-DE.json",
      },
    ],
    lazy: true,
    langDir: "lang",
    defaultLocale: "de-DE",
    customRoutes: "config",
    pages: {},
  },
  piniaPersistedstate: {
    storage: "localStorage",
  },
});
