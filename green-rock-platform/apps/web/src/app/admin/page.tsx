'use client';

import { useEffect, useState } from 'react';
import {
  Users,
  Building2,
  FolderKanban,
  Contact,
  Receipt,
  Package,
  Truck,
  TrendingUp,
} from 'lucide-react';
import { api } from '@/lib/api';
import { StatCard } from '@/components/dashboard/StatCard';
import { DashboardChart } from '@/components/dashboard/DashboardChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface ExecutiveDashboard {
  totalCustomers: number;
  totalProperties: number;
  activeProjects: number;
  openLeads: number;
  pendingInvoices: number;
  lowStockItems: number;
  pendingDeliveries: number;
  totalRevenue: number;
}

interface SalesPoint {
  month: string;
  revenue: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<ExecutiveDashboard | null>(null);
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      api<{ data: ExecutiveDashboard }>('/dashboard/executive'),
      api<{ data: SalesPoint[] }>('/dashboard/sales-chart'),
    ])
      .then(([execRes, chartRes]) => {
        setStats(execRes.data);
        setChartData(
          (chartRes.data ?? []).map((p) => ({
            name: p.month,
            value: Number(p.revenue),
          }))
        );
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) {
    return <p className="text-destructive">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Executive Dashboard</h2>
        <p className="text-muted-foreground">Real-time overview of Green Rock operations</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Customers" value={stats?.totalCustomers ?? '—'} icon={Users} />
        <StatCard title="Properties" value={stats?.totalProperties ?? '—'} icon={Building2} />
        <StatCard title="Active Projects" value={stats?.activeProjects ?? '—'} icon={FolderKanban} />
        <StatCard title="Open Leads" value={stats?.openLeads ?? '—'} icon={Contact} />
        <StatCard title="Pending Invoices" value={stats?.pendingInvoices ?? '—'} icon={Receipt} />
        <StatCard title="Low Stock Items" value={stats?.lowStockItems ?? '—'} icon={Package} />
        <StatCard title="Pending Deliveries" value={stats?.pendingDeliveries ?? '—'} icon={Truck} />
        <StatCard
          title="Total Revenue"
          value={stats ? formatCurrency(stats.totalRevenue) : '—'}
          icon={TrendingUp}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sales Revenue (6 months)</CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <DashboardChart data={chartData} type="line" height={320} />
          ) : (
            <p className="text-muted-foreground text-sm py-12 text-center">No sales data yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
