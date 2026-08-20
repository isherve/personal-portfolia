'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId?: string;
  createdAt: string;
  user?: { firstName: string; lastName: string; email: string };
}

export default function ReportsPage() {
  return (
    <DataList<AuditLog>
      title="Reports"
      description="Recent activity and audit trail"
      endpoint="/dashboard/recent-activity?limit=50"
      emptyMessage="No activity records."
      columns={[
        { header: 'Action', cell: (row) => row.action },
        { header: 'Entity', cell: (row) => row.entityType },
        {
          header: 'User',
          cell: (row) =>
            row.user ? `${row.user.firstName} ${row.user.lastName}` : '—',
        },
        { header: 'Date', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
