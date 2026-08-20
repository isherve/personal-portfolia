'use client';

import { DataList } from '@/components/portal/DataList';

interface Warehouse {
  id: string;
  name: string;
  location: string;
  isActive: boolean;
  stockLevels?: unknown[];
}

export default function WarehousesPage() {
  return (
    <DataList<Warehouse>
      title="Warehouses"
      description="Warehouse locations and stock"
      endpoint="/inventory/warehouses"
      emptyMessage="No warehouses configured."
      columns={[
        { header: 'Name', cell: (row) => row.name },
        { header: 'Location', cell: (row) => row.location },
        { header: 'Active', cell: (row) => (row.isActive ? 'Yes' : 'No') },
        { header: 'Stock Items', cell: (row) => String(row.stockLevels?.length ?? 0) },
      ]}
    />
  );
}
