import { I18nProvider } from "../../lib/i18n/context";
import { locales } from "../../lib/i18n/config";
import { Locale } from "../../lib/i18n/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <I18nProvider locale={locale}>
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </I18nProvider>
  );
}
