'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface LeaveRequest {
  id: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export default function LeavePage() {
  return (
    <DataList<LeaveRequest>
      title="Leave Requests"
      description="Your leave applications and status"
      endpoint="/hr/leave"
      emptyMessage="No leave requests submitted."
      columns={[
        { header: 'Type', cell: (row) => row.type },
        { header: 'From', cell: (row) => formatDate(row.startDate) },
        { header: 'To', cell: (row) => formatDate(row.endDate) },
        { header: 'Status', cell: (row) => row.status },
        { header: 'Submitted', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
