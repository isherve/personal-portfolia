'use client';

import { DataList } from '@/components/portal/DataList';
import { formatCurrency } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  unitPrice: number;
  isActive: boolean;
}

export default function InventoryPage() {
  return (
    <DataList<Product>
      title="Inventory"
      description="Products, stock levels, and materials"
      endpoint="/inventory/products"
      emptyMessage="No products in inventory."
      columns={[
        { header: 'Name', cell: (row) => row.name },
        { header: 'SKU', cell: (row) => row.sku },
        { header: 'Category', cell: (row) => row.category },
        { header: 'Unit Price', cell: (row) => formatCurrency(Number(row.unitPrice)) },
        { header: 'Active', cell: (row) => (row.isActive ? 'Yes' : 'No') },
      ]}
    />
  );
}
