'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LucideIcon, LogOut, Mountain, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface PortalLayoutProps {
  title: string;
  navItems: NavItem[];
  children: React.ReactNode;
  accent?: string;
}

export function PortalLayout({ title, navItems, children, accent = 'primary' }: PortalLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex">
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform lg:translate-x-0 lg:static',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex h-16 items-center gap-2 px-6 border-b">
          <Mountain className={cn('h-6 w-6', `text-${accent}`)} />
          <span className="font-display font-bold">{title}</span>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                pathname === href || pathname.startsWith(href + '/')
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}>
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="text-sm font-medium mb-1">{user?.firstName} {user?.lastName}</div>
          <div className="text-xs text-muted-foreground mb-3">{user?.email}</div>
          <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b flex items-center justify-between px-4 lg:px-8 bg-background">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold hidden sm:block">{title}</h1>
          <ThemeToggle />
        </header>
        <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export function PortalGuard({ allowed, children }: { allowed: ('admin' | 'customer' | 'employee')[]; children: React.ReactNode }) {
  const { user, loading, isAdmin, isCustomer, isEmployee } = useAuth();
  const router = useRouter();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const hasAccess =
    (allowed.includes('admin') && isAdmin) ||
    (allowed.includes('customer') && isCustomer) ||
    (allowed.includes('employee') && isEmployee);

  if (!hasAccess) {
    router.push('/');
    return null;
  }

  return <>{children}</>;
}
