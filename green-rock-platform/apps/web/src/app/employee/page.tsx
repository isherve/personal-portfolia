'use client';

import { useEffect, useState } from 'react';
import { CheckSquare, FolderKanban, MessageSquare, Palmtree } from 'lucide-react';
import { api } from '@/lib/api';
import { StatCard } from '@/components/dashboard/StatCard';

interface EmployeeDashboard {
  assignedTasks: number;
  assignedProjects: number;
  unreadMessages: number;
  leaveRequests: number;
}

export default function EmployeeDashboardPage() {
  const [stats, setStats] = useState<EmployeeDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<{ data: EmployeeDashboard }>('/dashboard/employee')
      .then((res) => setStats(res.data))
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) {
    return <p className="text-destructive">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Employee Dashboard</h2>
        <p className="text-muted-foreground">Your tasks, projects, and updates at a glance</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Open Tasks" value={stats?.assignedTasks ?? '—'} icon={CheckSquare} />
        <StatCard title="Active Projects" value={stats?.assignedProjects ?? '—'} icon={FolderKanban} />
        <StatCard title="Unread Messages" value={stats?.unreadMessages ?? '—'} icon={MessageSquare} />
        <StatCard title="Pending Leave" value={stats?.leaveRequests ?? '—'} icon={Palmtree} />
      </div>
    </div>
  );
}
