'use client';

import { DataList } from '@/components/portal/DataList';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Payslip {
  id: string;
  periodStart: string;
  periodEnd: string;
  netPay: number;
  status: string;
}

export default function PayslipsPage() {
  return (
    <DataList<Payslip>
      title="Payslips"
      description="Your salary and payment records"
      endpoint="/hr/payslips/mine"
      emptyMessage="No payslips available."
      columns={[
        { header: 'Period Start', cell: (row) => formatDate(row.periodStart) },
        { header: 'Period End', cell: (row) => formatDate(row.periodEnd) },
        { header: 'Net Pay', cell: (row) => formatCurrency(Number(row.netPay)) },
        { header: 'Status', cell: (row) => row.status },
      ]}
    />
  );
}
