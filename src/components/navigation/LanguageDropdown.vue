<template>
  <div class="dropup">
    <button
      class="btn btn-light dropdown-toggle"
      type="button"
      id="button-dropdown-languages"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span
        :class="
          'flag-icon flag-icon-' +
          currentMessage.meta.locale.substring(3, 5).toLowerCase()
        "
      ></span>
      <span class="mx-1 mt-20">
        {{ currentMessage.meta.name }}
      </span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="button-dropdown-languages">
      <li v-for="(message, code) in messagesWithCountry" :key="code">
        <button
          class="dropdown-item"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          @click="changeLanguage(code)"
        >
          <span
            :class="'flag-icon flag-icon-' + code.substring(3, 5).toLowerCase()"
          ></span>
          {{ message.meta.name }}
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "LanguageDropdown",
  computed: {
    currentMessage() {
      return this.$i18n.messages[this.$i18n.locale];
    },
    messagesWithCountry() {
      const messagesWithCountry = {};
      for (const locale in this.$i18n.messages) {
        if (locale.includes("-")) {
          messagesWithCountry[locale] = this.$i18n.messages[locale];
        }
      }
      return messagesWithCountry;
    },
  },
  methods: {
    changeLanguage(locale) {
      this.$i18n.locale = locale;
      this.$store.commit("changeLocale", locale);
    },
  },
};
</script>