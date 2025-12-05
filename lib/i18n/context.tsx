"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { Locale, TranslationKeys } from "./types";
import { en } from "./translations/en";
import { ru } from "./translations/ru";
import { ro } from "./translations/ro";
import { defaultLocale } from "./config";

const translations: Record<Locale, TranslationKeys> = {
  en,
  ru,
  ro,
};

interface I18nContextType {
  locale: Locale;
  t: TranslationKeys;
  setLocale?: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType>({
  locale: defaultLocale,
  t: translations[defaultLocale],
});

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ locale, t: translations[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslations() {
  return useContext(I18nContext);
}

