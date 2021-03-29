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
          'flag-icon flag-icon-' + $i18n.locale.substring(3, 5).toLowerCase()
        "
      ></span>
      {{ localeNames[$i18n.locale] }}
    </button>
    <ul class="dropdown-menu" aria-labelledby="button-dropdown-languages">
      <li v-for="(name, code) in localeNames" :key="code">
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
          {{ name }}
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
import { localeNames } from "@/js/i18n";

export default {
  name: "LanguageDropdown",
  data() {
    return {
      localeNames: localeNames,
    };
  },
  methods: {
    changeLanguage(locale) {
      this.$i18n.locale = locale;
      this.$store.commit("changeLocale", locale);
    },
    getLocale() {},
  },
};
</script>