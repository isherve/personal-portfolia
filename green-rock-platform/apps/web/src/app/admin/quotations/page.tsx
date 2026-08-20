'use client';

import { DataList } from '@/components/portal/DataList';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Quotation {
  id: string;
  quoteNumber: string;
  status: string;
  total: number;
  createdAt: string;
  customer?: { user?: { firstName: string; lastName: string } };
}

export default function QuotationsPage() {
  return (
    <DataList<Quotation>
      title="Quotations"
      description="Customer quote requests and estimates"
      endpoint="/finance/quotations"
      emptyMessage="No quotations found."
      columns={[
        { header: 'Quote #', cell: (row) => row.quoteNumber },
        {
          header: 'Customer',
          cell: (row) => {
            const u = row.customer?.user;
            return u ? `${u.firstName} ${u.lastName}` : '—';
          },
        },
        { header: 'Status', cell: (row) => row.status },
        { header: 'Total', cell: (row) => formatCurrency(Number(row.total)) },
        { header: 'Date', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
