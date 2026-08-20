'use client';

import { DataList } from '@/components/portal/DataList';
import { formatCurrency, formatDate } from '@/lib/utils';

interface PurchaseOrder {
  id: string;
  poNumber: string;
  status: string;
  total: number;
  createdAt: string;
  supplier?: { name: string };
}

export default function ProcurementPage() {
  return (
    <DataList<PurchaseOrder>
      title="Procurement"
      description="Purchase orders and suppliers"
      endpoint="/procurement/purchase-orders"
      emptyMessage="No purchase orders."
      columns={[
        { header: 'PO #', cell: (row) => row.poNumber },
        { header: 'Supplier', cell: (row) => row.supplier?.name ?? '—' },
        { header: 'Status', cell: (row) => row.status },
        { header: 'Total', cell: (row) => formatCurrency(Number(row.total)) },
        { header: 'Created', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
