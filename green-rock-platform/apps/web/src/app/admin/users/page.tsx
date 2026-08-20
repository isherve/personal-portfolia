'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function UsersPage() {
  return (
    <DataList<User>
      title="Users"
      description="Platform user accounts and roles"
      endpoint="/system/users"
      emptyMessage="No users found."
      columns={[
        { header: 'Name', cell: (row) => `${row.firstName} ${row.lastName}` },
        { header: 'Email', cell: (row) => row.email },
        { header: 'Role', cell: (row) => row.role },
        { header: 'Active', cell: (row) => (row.isActive ? 'Yes' : 'No') },
        { header: 'Joined', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
