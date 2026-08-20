'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface Document {
  id: string;
  title: string;
  category: string;
  mimeType: string;
  createdAt: string;
}

export default function EmployeeDocumentsPage() {
  return (
    <DataList<Document>
      title="Documents"
      description="Company and project documents"
      endpoint="/system"
      emptyMessage="No documents found."
      columns={[
        { header: 'Title', cell: (row) => row.title },
        { header: 'Category', cell: (row) => row.category },
        { header: 'Type', cell: (row) => row.mimeType },
        { header: 'Uploaded', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
