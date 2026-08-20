import type { Metadata } from 'next';
import Link from 'next/link';
import { Mountain } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Authentication',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="p-6">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary w-fit">
          <Mountain className="h-7 w-7" />
          Green Rock
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>
    </div>
  );
}
