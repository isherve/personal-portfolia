'use client';

import React, { createContext, useContext, useState } from 'react';
import { en, fr, Translations } from './translations';

type Locale = 'en' | 'fr';

const I18nContext = createContext<{ locale: Locale; t: Translations; setLocale: (l: Locale) => void }>({
  locale: 'en',
  t: en,
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const t = locale === 'fr' ? fr : en;
  return <I18nContext.Provider value={{ locale, t, setLocale }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
