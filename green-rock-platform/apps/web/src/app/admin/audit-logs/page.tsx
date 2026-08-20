'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  ipAddress?: string;
  createdAt: string;
  user?: { firstName: string; lastName: string; email: string };
}

export default function AuditLogsPage() {
  return (
    <DataList<AuditLog>
      title="Audit Logs"
      description="System audit trail and security events"
      endpoint="/system/audit-logs"
      emptyMessage="No audit logs."
      columns={[
        { header: 'Action', cell: (row) => row.action },
        { header: 'Entity', cell: (row) => row.entityType },
        {
          header: 'User',
          cell: (row) =>
            row.user ? `${row.user.firstName} ${row.user.lastName}` : 'System',
        },
        { header: 'IP', cell: (row) => row.ipAddress ?? '—' },
        { header: 'Date', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
