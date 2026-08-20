'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate?: string;
  project?: { name: string };
}

export default function EmployeeTasksPage() {
  return (
    <DataList<Task>
      title="My Tasks"
      description="Tasks assigned to you across projects"
      endpoint="/projects/tasks/mine"
      emptyMessage="No tasks assigned."
      columns={[
        { header: 'Task', cell: (row) => row.title },
        { header: 'Project', cell: (row) => row.project?.name ?? '—' },
        { header: 'Priority', cell: (row) => row.priority },
        { header: 'Status', cell: (row) => row.status },
        { header: 'Due', cell: (row) => (row.dueDate ? formatDate(row.dueDate) : '—') },
      ]}
    />
  );
}
