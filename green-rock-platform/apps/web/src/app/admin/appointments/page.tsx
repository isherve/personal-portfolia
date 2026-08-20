'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface Appointment {
  id: string;
  title: string;
  type: string;
  status: string;
  scheduledAt: string;
  customer?: { user?: { firstName: string; lastName: string } };
}

export default function AppointmentsPage() {
  return (
    <DataList<Appointment>
      title="Appointments"
      description="Scheduled customer appointments"
      endpoint="/support/appointments"
      emptyMessage="No appointments scheduled."
      columns={[
        { header: 'Title', cell: (row) => row.title },
        {
          header: 'Customer',
          cell: (row) => {
            const u = row.customer?.user;
            return u ? `${u.firstName} ${u.lastName}` : '—';
          },
        },
        { header: 'Type', cell: (row) => row.type ?? '—' },
        { header: 'Status', cell: (row) => row.status },
        { header: 'Scheduled', cell: (row) => formatDate(row.scheduledAt) },
      ]}
    />
  );
}
