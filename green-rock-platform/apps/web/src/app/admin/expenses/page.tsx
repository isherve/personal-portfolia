'use client';

import { DataList } from '@/components/portal/DataList';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Expense {
  id: string;
  description: string;
  category: string;
  amount: number;
  status: string;
  createdAt: string;
}

export default function ExpensesPage() {
  return (
    <DataList<Expense>
      title="Expenses"
      description="Company expense tracking"
      endpoint="/finance/expenses"
      emptyMessage="No expenses recorded."
      columns={[
        { header: 'Description', cell: (row) => row.description },
        { header: 'Category', cell: (row) => row.category },
        { header: 'Amount', cell: (row) => formatCurrency(Number(row.amount)) },
        { header: 'Status', cell: (row) => row.status },
        { header: 'Date', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
