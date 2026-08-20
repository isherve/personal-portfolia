'use client';

import { DataList } from '@/components/portal/DataList';

interface Employee {
  id: string;
  department: string;
  position: string;
  user?: { firstName: string; lastName: string; email: string; isActive: boolean };
}

export default function HrPage() {
  return (
    <DataList<Employee>
      title="Human Resources"
      description="Employee records and workforce management"
      endpoint="/hr/employees"
      emptyMessage="No employees found."
      columns={[
        {
          header: 'Name',
          cell: (row) =>
            row.user ? `${row.user.firstName} ${row.user.lastName}` : '—',
        },
        { header: 'Email', cell: (row) => row.user?.email ?? '—' },
        { header: 'Department', cell: (row) => row.department },
        { header: 'Position', cell: (row) => row.position },
        { header: 'Active', cell: (row) => (row.user?.isActive ? 'Yes' : 'No') },
      ]}
    />
  );
}
