'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface Contract {
  id: string;
  contractNumber: string;
  title: string;
  status: string;
  startDate?: string;
  endDate?: string;
  customer?: { user?: { firstName: string; lastName: string } };
}

export default function ContractsPage() {
  return (
    <DataList<Contract>
      title="Contracts"
      description="Client and project contracts"
      endpoint="/finance/contracts"
      emptyMessage="No contracts found."
      columns={[
        { header: 'Contract #', cell: (row) => row.contractNumber },
        { header: 'Title', cell: (row) => row.title },
        {
          header: 'Customer',
          cell: (row) => {
            const u = row.customer?.user;
            return u ? `${u.firstName} ${u.lastName}` : '—';
          },
        },
        { header: 'Status', cell: (row) => row.status },
        { header: 'Start', cell: (row) => (row.startDate ? formatDate(row.startDate) : '—') },
      ]}
    />
  );
}
