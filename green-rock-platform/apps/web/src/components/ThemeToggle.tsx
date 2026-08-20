'use client';

import { Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();
  return (
    <Button variant="ghost" size="sm" onClick={() => setLocale(locale === 'en' ? 'fr' : 'en')}>
      <Globe className="h-4 w-4 mr-1" />
      {locale.toUpperCase()}
    </Button>
  );
}
