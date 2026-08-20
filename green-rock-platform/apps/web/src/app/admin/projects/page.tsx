'use client';

import { DataList } from '@/components/portal/DataList';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Project {
  id: string;
  name: string;
  code: string;
  status: string;
  budget?: number;
  startDate?: string;
  creator?: { firstName: string; lastName: string };
}

export default function ProjectsPage() {
  return (
    <DataList<Project>
      title="Projects"
      description="Construction and development projects"
      endpoint="/projects"
      emptyMessage="No projects found."
      columns={[
        { header: 'Name', cell: (row) => row.name },
        { header: 'Code', cell: (row) => row.code },
        { header: 'Status', cell: (row) => row.status },
        {
          header: 'Budget',
          cell: (row) => (row.budget ? formatCurrency(Number(row.budget)) : '—'),
        },
        {
          header: 'Manager',
          cell: (row) =>
            row.creator ? `${row.creator.firstName} ${row.creator.lastName}` : '—',
        },
        { header: 'Start', cell: (row) => (row.startDate ? formatDate(row.startDate) : '—') },
      ]}
    />
  );
}
