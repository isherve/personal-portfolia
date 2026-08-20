'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  return (
    <DataList<Notification>
      title="Notifications"
      description="Updates about your account and activities"
      endpoint="/support/notifications"
      emptyMessage="No notifications."
      columns={[
        { header: 'Title', cell: (row) => row.title },
        { header: 'Message', cell: (row) => row.message.slice(0, 60) },
        { header: 'Read', cell: (row) => (row.isRead ? 'Yes' : 'No') },
        { header: 'Date', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
