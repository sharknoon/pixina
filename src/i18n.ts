import type { I18n } from "vue-i18n";
import { createI18n } from "vue-i18n";

const SUPPORTED_LOCALES = ["en", "de", "en-US", "de-DE"];

function loadLocaleMessages(i18n: I18n<unknown, unknown, unknown, false>) {
  const locales = import.meta.glob("./locales/**/*.json");
  for (const path in locales) {
    locales[path]().then((m) => {
      const message = m.default;
      const matched = path.match(/([A-Za-z0-9-_]+)\./i);
      if (matched && matched.length > 1) {
        const locale: string = matched[1];
        i18n.global.setLocaleMessage(locale, message);
        // If the locale has the 'meta.act-as-fallback' set to true, add this locale as default for their language
        if (
          locale.includes("-") &&
          message.meta &&
          message.meta["act-as-fallback"]
        ) {
          i18n.global.setLocaleMessage(locale.substring(0, 2), message);
        }
      }
    });
  }
}

function getStoredLocale(): string | undefined {
  try {
    const item: string = localStorage.getItem("locale") || "{}";
    return JSON.parse(item).locale;
  } catch (error) {
    console.error(error);
  }
}

function getBrowserLocale(): string | undefined {
  let locales: string[] = [...navigator.languages];
  if (!locales) locales = [navigator.language];
  if (!locales[0]) return;
  // Inserting fallbacks to language (without country) after locale
  locales.forEach((locale: string, index: number) => {
    const language: string = locale.substring(0, 2);
    if (!locales.includes(language)) locales.splice(index + 1, 0, language);
  });
  // Filters the locales by availability and takes the first one
  return locales.filter((l) => SUPPORTED_LOCALES.includes(l))[0];
}

const i18n = createI18n({
  locale: getStoredLocale() || getBrowserLocale() || "en-US",
  fallbackLocale: "en-US",
  silentFallbackWarn: true,
  legacy: false,
});

loadLocaleMessages(i18n);

export default i18n;
