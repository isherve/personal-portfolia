'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface Message {
  id: string;
  subject: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  sender?: { firstName: string; lastName: string };
}

export default function MessagesPage() {
  return (
    <DataList<Message>
      title="Messages"
      description="Your conversations with Green Rock staff"
      endpoint="/support/messages"
      emptyMessage="No messages yet."
      columns={[
        {
          header: 'From',
          cell: (row) =>
            row.sender ? `${row.sender.firstName} ${row.sender.lastName}` : '—',
        },
        { header: 'Subject', cell: (row) => row.subject ?? row.body.slice(0, 40) },
        { header: 'Read', cell: (row) => (row.isRead ? 'Yes' : 'No') },
        { header: 'Date', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
