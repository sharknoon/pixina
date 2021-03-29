import Vue from "vue"
import VueI18n from "vue-i18n"

Vue.use(VueI18n);

const defaultLocales = {
  "de": "de-DE",
  "en": "en-US"
};

export const localeNames = {};

function loadLocaleMessages() {
  const locales = require.context("../locales", true, /[A-Za-z0-9-\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      const message = locales(key);
      localeNames[locale] = message.meta && message.meta.name;
      messages[locale] = message;
    }
  });
  return messages;
}

function getStoredLocale() {
  const item = localStorage.getItem("vuex") || "{}";
  return JSON.parse(item).locale;
}

function getBrowserLocale() {
  const locale = navigator.language;
  if (!locale) return undefined;
  if (locale.includes("-")) {
    // Check if a non supported locale is given e.g. "de-AT" => "de" => "de-DE"
    if (!localeNames[locale]) {
      const language = locale.substring(0, 2);
      return defaultLocales[language];
    }
  } else {
    // Check if language only locale is given e.g. "de" => "de-DE"
    return defaultLocales[locale];
  }
  return locale;
}

export default new VueI18n({
  locale: getStoredLocale() || getBrowserLocale() || "en-US",
  fallbackLocale: "en-US",
  messages: loadLocaleMessages(),
  silentFallbackWarn: true
});