'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  status: string;
  priority: string;
  createdAt: string;
}

export default function SupportPage() {
  return (
    <DataList<SupportTicket>
      title="Support Tickets"
      description="Track your support requests and replies"
      endpoint="/support/tickets/mine"
      emptyMessage="No support tickets. Create one when you need help."
      columns={[
        { header: 'Ticket #', cell: (row) => row.ticketNumber },
        { header: 'Subject', cell: (row) => row.subject },
        { header: 'Priority', cell: (row) => row.priority },
        { header: 'Status', cell: (row) => row.status },
        { header: 'Created', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
