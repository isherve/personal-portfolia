'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Task {
  id: string;
  project?: { name: string; code: string };
}

export default function EmployeeProjectsPage() {
  const [projects, setProjects] = useState<{ name: string; code: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<{ data: Task[] }>('/projects/tasks/mine')
      .then((res) => {
        const seen = new Map<string, { name: string; code: string }>();
        (res.data ?? []).forEach((task) => {
          if (task.project) seen.set(task.project.code, task.project);
        });
        setProjects(Array.from(seen.values()));
      })
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Projects</CardTitle>
        <p className="text-sm text-muted-foreground">Projects you are assigned to</p>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading...
          </div>
        )}
        {!loading && projects.length === 0 && (
          <p className="text-muted-foreground text-sm py-8 text-center">No projects assigned.</p>
        )}
        {!loading && projects.length > 0 && (
          <ul className="divide-y">
            {projects.map((p) => (
              <li key={p.code} className="py-3 flex justify-between">
                <span className="font-medium">{p.name}</span>
                <span className="text-muted-foreground text-sm">{p.code}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
