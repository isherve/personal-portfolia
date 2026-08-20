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
  receiver?: { firstName: string; lastName: string };
}

export default function EmployeeMessagesPage() {
  return (
    <DataList<Message>
      title="Messages"
      description="Internal messages and communications"
      endpoint="/support/messages"
      emptyMessage="No messages."
      columns={[
        {
          header: 'Contact',
          cell: (row) => {
            const person = row.sender ?? row.receiver;
            return person ? `${person.firstName} ${person.lastName}` : '—';
          },
        },
        { header: 'Subject', cell: (row) => row.subject ?? row.body.slice(0, 40) },
        { header: 'Read', cell: (row) => (row.isRead ? 'Yes' : 'No') },
        { header: 'Date', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
