'use client';

import {
  LayoutDashboard,
  Heart,
  FileText,
  Hammer,
  ShoppingCart,
  Calendar,
  Receipt,
  CreditCard,
  LifeBuoy,
  FolderOpen,
  MessageSquare,
  Bell,
  User,
} from 'lucide-react';
import { PortalGuard, PortalLayout } from '@/components/layout/PortalLayout';

const navItems = [
  { href: '/portal', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portal/saved', label: 'Saved Properties', icon: Heart },
  { href: '/portal/quotes', label: 'Quotes', icon: FileText },
  { href: '/portal/construction', label: 'Construction', icon: Hammer },
  { href: '/portal/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/portal/appointments', label: 'Appointments', icon: Calendar },
  { href: '/portal/invoices', label: 'Invoices', icon: Receipt },
  { href: '/portal/payments', label: 'Payments', icon: CreditCard },
  { href: '/portal/support', label: 'Support', icon: LifeBuoy },
  { href: '/portal/documents', label: 'Documents', icon: FolderOpen },
  { href: '/portal/messages', label: 'Messages', icon: MessageSquare },
  { href: '/portal/notifications', label: 'Notifications', icon: Bell },
  { href: '/portal/profile', label: 'Profile', icon: User },
];

export default function CustomerPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalGuard allowed={['customer']}>
      <PortalLayout title="Customer Portal" navItems={navItems} accent="primary">
        {children}
      </PortalLayout>
    </PortalGuard>
  );
}
