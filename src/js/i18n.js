///////////////////////////////////////////
//                 i18n                  //
///////////////////////////////////////////

import { createI18n } from 'vue-i18n'

function loadLocaleMessages() {
  const locales = require.context("@/locales", true, /[A-Za-z0-9-_\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      const message = locales(key);
      messages[locale] = message;
      // If the locale has the 'meta.act-as-fallback' set to true, add this locale as default for their language
      if (locale.includes("-") && message.meta && message.meta["act-as-fallback"]) {
        messages[locale.substring(0, 2)] = message;
      }
    }
  });
  return messages;
}

function getStoredLocale() {
  try {
    const item = localStorage.getItem("locale") || "{}";
    return JSON.parse(item).locale
  } catch (error) {
    console.error(error);
  }
}

const messages = loadLocaleMessages();

function getBrowserLocale() {
  let locales = [...navigator.languages];
  if (!locales) locales = [navigator.language || navigator.userLanguage]
  if (!locales[0]) return;
  // Inserting fallbacks to language (without country) after locale
  locales.forEach((locale, index) => {
    const language = locale.substring(0, 2);
    if (!locales.includes(language)) locales.splice(index + 1, 0, language);
  });
  // Filters the locales by availability and takes the first one
  return locales.filter(l => messages[l])[0];
}

export default createI18n({
  locale: getStoredLocale() || getBrowserLocale() || "en-US",
  fallbackLocale: "en-US",
  messages: messages,
  silentFallbackWarn: true,
  legacy: false
});