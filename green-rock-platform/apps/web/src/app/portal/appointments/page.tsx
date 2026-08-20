'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface Appointment {
  id: string;
  title: string;
  type: string;
  status: string;
  scheduledAt: string;
}

export default function AppointmentsPage() {
  return (
    <DataList<Appointment>
      title="Appointments"
      description="Your scheduled site visits and consultations"
      endpoint="/support/appointments/mine"
      emptyMessage="No appointments scheduled."
      columns={[
        { header: 'Title', cell: (row) => row.title },
        { header: 'Type', cell: (row) => row.type ?? '—' },
        { header: 'Status', cell: (row) => row.status },
        { header: 'Scheduled', cell: (row) => formatDate(row.scheduledAt) },
      ]}
    />
  );
}
