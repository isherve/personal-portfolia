'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface Campaign {
  id: string;
  name: string;
  type: string;
  status: string;
  createdAt: string;
}

export default function MarketingPage() {
  return (
    <DataList<Campaign>
      title="Marketing"
      description="Campaigns and marketing activities"
      endpoint="/cms/campaigns"
      emptyMessage="No marketing campaigns."
      columns={[
        { header: 'Name', cell: (row) => row.name },
        { header: 'Type', cell: (row) => row.type },
        { header: 'Status', cell: (row) => row.status },
        { header: 'Created', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
