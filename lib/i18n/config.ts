import { Locale } from "./types";

export const locales: Locale[] = ["en", "ru", "ro"];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  ro: "Română",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  ru: "🇷🇺",
  ro: "🇷🇴",
};

