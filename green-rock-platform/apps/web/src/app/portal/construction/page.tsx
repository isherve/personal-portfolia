'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface ConstructionRequest {
  id: string;
  projectType: string;
  status: string;
  location: string;
  createdAt: string;
}

export default function ConstructionPage() {
  return (
    <DataList<ConstructionRequest>
      title="Construction Requests"
      description="Track your construction and renovation requests"
      endpoint="/projects/construction-requests/mine"
      emptyMessage="No construction requests submitted yet."
      columns={[
        { header: 'Project Type', cell: (row) => row.projectType },
        { header: 'Location', cell: (row) => row.location ?? '—' },
        { header: 'Status', cell: (row) => row.status },
        { header: 'Submitted', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
