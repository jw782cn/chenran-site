"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { Locale } from "./i18n";

type LanguageContextValue = {
  locale: Locale;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const toggle = useCallback(
    () => setLocale((prev) => (prev === "en" ? "zh" : "en")),
    []
  );

  return (
    <LanguageContext.Provider value={{ locale, toggle }}>
      <div data-locale={locale}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
