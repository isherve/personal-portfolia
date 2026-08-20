'use client';

import { DataList } from '@/components/portal/DataList';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Payslip {
  id: string;
  periodStart: string;
  periodEnd: string;
  netPay: number;
  status: string;
  employee?: { user?: { firstName: string; lastName: string } };
}

export default function PayrollPage() {
  return (
    <DataList<Payslip>
      title="Payroll"
      description="Employee payslips and payroll records"
      endpoint="/hr/payslips"
      emptyMessage="No payslips generated."
      columns={[
        {
          header: 'Employee',
          cell: (row) => {
            const u = row.employee?.user;
            return u ? `${u.firstName} ${u.lastName}` : '—';
          },
        },
        { header: 'Period Start', cell: (row) => formatDate(row.periodStart) },
        { header: 'Period End', cell: (row) => formatDate(row.periodEnd) },
        { header: 'Net Pay', cell: (row) => formatCurrency(Number(row.netPay)) },
        { header: 'Status', cell: (row) => row.status },
      ]}
    />
  );
}
