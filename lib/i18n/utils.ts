import { locales, defaultLocale } from "./config";
import { Locale } from "./types";

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  
  return defaultLocale;
}

export function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && locales.includes(firstSegment as Locale)) {
    return "/" + segments.slice(1).join("/");
  }
  
  return pathname;
}

export function addLocaleToPath(pathname: string, locale: Locale): string {
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const pathWithoutLocale = getPathWithoutLocale(cleanPath);
  return `/${locale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
}

