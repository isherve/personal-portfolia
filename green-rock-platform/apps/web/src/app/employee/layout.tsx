'use client';

import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Clock,
  Palmtree,
  Wallet,
  MessageSquare,
  FolderOpen,
  BarChart3,
} from 'lucide-react';
import { PortalGuard, PortalLayout } from '@/components/layout/PortalLayout';

const navItems = [
  { href: '/employee', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/employee/projects', label: 'Projects', icon: FolderKanban },
  { href: '/employee/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/employee/attendance', label: 'Attendance', icon: Clock },
  { href: '/employee/leave', label: 'Leave', icon: Palmtree },
  { href: '/employee/payslips', label: 'Payslips', icon: Wallet },
  { href: '/employee/messages', label: 'Messages', icon: MessageSquare },
  { href: '/employee/documents', label: 'Documents', icon: FolderOpen },
  { href: '/employee/reports', label: 'Reports', icon: BarChart3 },
];

export default function EmployeePortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalGuard allowed={['employee']}>
      <PortalLayout title="Employee Portal" navItems={navItems} accent="primary">
        {children}
      </PortalLayout>
    </PortalGuard>
  );
}
