"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { Locale } from "./i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  setLocale: () => {},
});

export function LanguageProvider({
  children,
  initialLocale = "en",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const updateLocale = useCallback((nextLocale: Locale) => setLocale(nextLocale), []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale: updateLocale }}>
      <div data-locale={locale}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
