'use client';

import {
  LayoutDashboard,
  Users,
  UserCircle,
  Building2,
  FolderKanban,
  Package,
  Warehouse,
  ShoppingBag,
  Truck,
  Briefcase,
  Wallet,
  Landmark,
  Receipt,
  CreditCard,
  FileText,
  FileSignature,
  Calendar,
  Megaphone,
  BookOpen,
  Image,
  Star,
  BriefcaseBusiness,
  BarChart3,
  Shield,
  Settings,
  Contact,
} from 'lucide-react';
import { PortalGuard, PortalLayout } from '@/components/layout/PortalLayout';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/crm', label: 'CRM', icon: Contact },
  { href: '/admin/customers', label: 'Customers', icon: UserCircle },
  { href: '/admin/properties', label: 'Properties', icon: Building2 },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/inventory', label: 'Inventory', icon: Package },
  { href: '/admin/warehouses', label: 'Warehouses', icon: Warehouse },
  { href: '/admin/procurement', label: 'Procurement', icon: ShoppingBag },
  { href: '/admin/fleet', label: 'Fleet', icon: Truck },
  { href: '/admin/hr', label: 'HR', icon: Briefcase },
  { href: '/admin/payroll', label: 'Payroll', icon: Wallet },
  { href: '/admin/finance', label: 'Finance', icon: Landmark },
  { href: '/admin/invoices', label: 'Invoices', icon: Receipt },
  { href: '/admin/expenses', label: 'Expenses', icon: CreditCard },
  { href: '/admin/quotations', label: 'Quotations', icon: FileText },
  { href: '/admin/contracts', label: 'Contracts', icon: FileSignature },
  { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { href: '/admin/marketing', label: 'Marketing', icon: Megaphone },
  { href: '/admin/cms/blog', label: 'CMS — Blog', icon: BookOpen },
  { href: '/admin/cms/gallery', label: 'CMS — Gallery', icon: Image },
  { href: '/admin/cms/testimonials', label: 'CMS — Testimonials', icon: Star },
  { href: '/admin/cms/careers', label: 'CMS — Careers', icon: BriefcaseBusiness },
  { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/audit-logs', label: 'Audit Logs', icon: Shield },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalGuard allowed={['admin']}>
      <PortalLayout title="Admin ERP" navItems={navItems} accent="primary">
        {children}
      </PortalLayout>
    </PortalGuard>
  );
}
