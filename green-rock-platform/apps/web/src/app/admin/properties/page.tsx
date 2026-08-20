'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface Property {
  id: string;
  title: string;
  city: string;
  status: string;
  createdAt: string;
  listings?: { type: string; price: number }[];
}

export default function PropertiesPage() {
  return (
    <DataList<Property>
      title="Properties"
      description="Real estate portfolio management"
      endpoint="/properties"
      emptyMessage="No properties found."
      columns={[
        { header: 'Title', cell: (row) => row.title },
        { header: 'City', cell: (row) => row.city },
        { header: 'Status', cell: (row) => row.status },
        {
          header: 'Listings',
          cell: (row) => String(row.listings?.length ?? 0),
        },
        { header: 'Created', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
