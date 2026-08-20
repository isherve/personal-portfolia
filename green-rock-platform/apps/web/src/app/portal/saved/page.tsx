'use client';

import Link from 'next/link';
import { DataList } from '@/components/portal/DataList';
import { formatCurrency } from '@/lib/utils';

interface SavedProperty {
  id: string;
  property: {
    title: string;
    city: string;
    slug: string;
    listings?: { price: number; type: string }[];
  };
}

export default function SavedPropertiesPage() {
  return (
    <DataList<SavedProperty>
      title="Saved Properties"
      description="Properties you have bookmarked"
      endpoint="/properties/saved/mine"
      emptyMessage="You haven't saved any properties yet."
      columns={[
        {
          header: 'Property',
          cell: (row) => (
            <Link href={`/properties/${row.property.slug}`} className="font-medium text-primary hover:underline">
              {row.property.title}
            </Link>
          ),
        },
        { header: 'City', cell: (row) => row.property.city },
        {
          header: 'Price',
          cell: (row) => {
            const listing = row.property.listings?.[0];
            return listing ? formatCurrency(Number(listing.price)) : '—';
          },
        },
        {
          header: 'Type',
          cell: (row) => row.property.listings?.[0]?.type ?? '—',
        },
      ]}
    />
  );
}
