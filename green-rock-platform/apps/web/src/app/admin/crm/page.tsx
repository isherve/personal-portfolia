'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  interest?: string;
  createdAt: string;
  assignee?: { firstName: string; lastName: string };
}

export default function CrmPage() {
  return (
    <DataList<Lead>
      title="CRM — Leads"
      description="Manage sales leads and pipeline"
      endpoint="/crm"
      emptyMessage="No leads found."
      columns={[
        { header: 'Name', cell: (row) => `${row.firstName} ${row.lastName}` },
        { header: 'Email', cell: (row) => row.email },
        { header: 'Interest', cell: (row) => row.interest ?? '—' },
        { header: 'Status', cell: (row) => row.status },
        {
          header: 'Assignee',
          cell: (row) =>
            row.assignee ? `${row.assignee.firstName} ${row.assignee.lastName}` : '—',
        },
        { header: 'Created', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
