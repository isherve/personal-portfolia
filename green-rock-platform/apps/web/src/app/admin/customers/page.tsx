'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface Customer {
  id: string;
  companyName?: string;
  createdAt: string;
  user?: { firstName: string; lastName: string; email: string };
}

export default function CustomersPage() {
  return (
    <DataList<Customer>
      title="Customers"
      description="Registered customer accounts"
      endpoint="/crm/customers/list"
      emptyMessage="No customers found."
      columns={[
        {
          header: 'Name',
          cell: (row) =>
            row.user ? `${row.user.firstName} ${row.user.lastName}` : '—',
        },
        { header: 'Email', cell: (row) => row.user?.email ?? '—' },
        { header: 'Company', cell: (row) => row.companyName ?? '—' },
        { header: 'Joined', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
