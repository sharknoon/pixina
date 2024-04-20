// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["bootstrap/dist/css/bootstrap.min.css", "/assets/main.css"],
  runtimeConfig: {
    public: {
      apiUrl: process.env.PIXINA_API_URL || "https://pixina.app/api/v1/progress",
      pixelhobbTileId:
        parseInt(process.env.PIXINA_PIXELHOBBY_TILE_ID ?? "") || 35007450218648,
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
