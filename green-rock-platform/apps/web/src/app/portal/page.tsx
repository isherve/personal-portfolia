'use client';

import { useEffect, useState } from 'react';
import { Heart, ShoppingCart, Receipt, Calendar, LifeBuoy } from 'lucide-react';
import { api } from '@/lib/api';
import { StatCard } from '@/components/dashboard/StatCard';

interface CustomerDashboard {
  savedProperties: number;
  orders: number;
  pendingInvoices: number;
  upcomingAppointments: number;
  openTickets: number;
}

export default function CustomerDashboardPage() {
  const [stats, setStats] = useState<CustomerDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<{ data: CustomerDashboard }>('/dashboard/customer')
      .then((res) => setStats(res.data))
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) {
    return <p className="text-destructive">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground">Overview of your Green Rock account</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard title="Saved Properties" value={stats?.savedProperties ?? '—'} icon={Heart} />
        <StatCard title="Material Orders" value={stats?.orders ?? '—'} icon={ShoppingCart} />
        <StatCard title="Pending Invoices" value={stats?.pendingInvoices ?? '—'} icon={Receipt} />
        <StatCard title="Upcoming Appointments" value={stats?.upcomingAppointments ?? '—'} icon={Calendar} />
        <StatCard title="Open Support Tickets" value={stats?.openTickets ?? '—'} icon={LifeBuoy} />
      </div>
    </div>
  );
}
