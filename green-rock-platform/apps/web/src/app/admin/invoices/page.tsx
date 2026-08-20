'use client';

import { DataList } from '@/components/portal/DataList';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Invoice {
  id: string;
  invoiceNumber: string;
  status: string;
  total: number;
  dueDate?: string;
  customer?: { user?: { firstName: string; lastName: string } };
}

export default function InvoicesPage() {
  return (
    <DataList<Invoice>
      title="Invoices"
      description="All customer and project invoices"
      endpoint="/finance/invoices"
      emptyMessage="No invoices found."
      columns={[
        { header: 'Invoice #', cell: (row) => row.invoiceNumber },
        {
          header: 'Customer',
          cell: (row) => {
            const u = row.customer?.user;
            return u ? `${u.firstName} ${u.lastName}` : '—';
          },
        },
        { header: 'Status', cell: (row) => row.status },
        { header: 'Total', cell: (row) => formatCurrency(Number(row.total)) },
        { header: 'Due', cell: (row) => (row.dueDate ? formatDate(row.dueDate) : '—') },
      ]}
    />
  );
}
