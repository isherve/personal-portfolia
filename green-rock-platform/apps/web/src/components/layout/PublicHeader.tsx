'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Mountain } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle, LanguageToggle } from '@/components/ThemeToggle';
import { useI18n } from '@/i18n/provider';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/projects', key: 'projects' },
  { href: '/properties', key: 'properties' },
  { href: '/materials', key: 'materials' },
  { href: '/gallery', key: 'gallery' },
  { href: '/blog', key: 'blog' },
  { href: '/careers', key: 'careers' },
  { href: '/contact', key: 'contact' },
] as const;

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useI18n();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          <Mountain className="h-7 w-7" />
          <span className="hidden sm:inline">Green Rock</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary',
                pathname === href ? 'text-primary bg-primary/10' : 'text-muted-foreground'
              )}
            >
              {t.nav[key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          {user ? (
            <Button asChild size="sm">
              <Link href={user.role === 'CUSTOMER' ? '/portal' : user.role === 'EMPLOYEE' ? '/employee' : '/admin'}>
                {t.nav.portal}
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link href="/auth/login">{t.nav.login}</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/auth/register">{t.nav.register}</Link>
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t px-4 py-4 space-y-1">
          {navLinks.map(({ href, key }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className={cn('block px-3 py-2 rounded-md text-sm', pathname === href ? 'bg-primary/10 text-primary' : 'text-muted-foreground')}>
              {t.nav[key]}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function PublicFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold text-primary mb-4">
              <Mountain className="h-6 w-6" /> Green Rock
            </div>
            <p className="text-sm text-muted-foreground">{t.footer.tagline}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services" className="hover:text-primary">Real Estate</Link></li>
              <li><Link href="/services" className="hover:text-primary">Construction</Link></li>
              <li><Link href="/materials" className="hover:text-primary">Building Materials</Link></li>
              <li><Link href="/services" className="hover:text-primary">Interior Design</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>KG 7 Ave, Kigali, Rwanda</li>
              <li>+250 788 123 456</li>
              <li>info@greenrock.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Green Rock General Supply Ltd. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
