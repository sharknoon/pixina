import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    ignores: ["public/"],
  },
  {
    rules: {
      // Allows prettier to handle self closing tags
      "vue/html-self-closing": "off",
    },
  },
);
