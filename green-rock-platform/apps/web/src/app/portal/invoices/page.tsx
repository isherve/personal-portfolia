'use client';

import { DataList } from '@/components/portal/DataList';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Invoice {
  id: string;
  invoiceNumber: string;
  status: string;
  total: number;
  dueDate: string;
}

export default function InvoicesPage() {
  return (
    <DataList<Invoice>
      title="Invoices"
      description="View and download your invoices"
      endpoint="/finance/invoices/mine"
      emptyMessage="No invoices found."
      columns={[
        { header: 'Invoice #', cell: (row) => row.invoiceNumber },
        { header: 'Status', cell: (row) => row.status },
        { header: 'Total', cell: (row) => formatCurrency(Number(row.total)) },
        { header: 'Due Date', cell: (row) => (row.dueDate ? formatDate(row.dueDate) : '—') },
      ]}
    />
  );
}
