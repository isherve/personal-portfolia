'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  status: string;
  createdAt: string;
}

export default function CmsCareersPage() {
  return (
    <DataList<Career>
      title="CMS — Careers"
      description="Job openings and career listings"
      endpoint="/cms/careers"
      emptyMessage="No career listings."
      columns={[
        { header: 'Title', cell: (row) => row.title },
        { header: 'Department', cell: (row) => row.department },
        { header: 'Location', cell: (row) => row.location },
        { header: 'Status', cell: (row) => row.status },
        { header: 'Posted', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
