import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/lib/auth';
import { I18nProvider } from '@/i18n/provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'Green Rock General Supply Ltd',
    template: '%s | Green Rock',
  },
  description: 'Real Estate, Construction, Building Materials, Timber, Interior Design & Painting Services in Rwanda.',
  keywords: ['real estate', 'construction', 'building materials', 'timber', 'Rwanda', 'Kigali', 'property'],
  openGraph: {
    title: 'Green Rock General Supply Ltd',
    description: 'Your trusted partner in real estate, construction, and building materials.',
    type: 'website',
    locale: 'en_RW',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <I18nProvider>
            <AuthProvider>{children}</AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
