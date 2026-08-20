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

export default function DocumentsPage() {
  return (
    <DataList<Document>
      title="Documents"
      description="Your uploaded and shared documents"
      endpoint="/system"
      emptyMessage="No documents available."
      columns={[
        { header: 'Title', cell: (row) => row.title },
        { header: 'Category', cell: (row) => row.category },
        { header: 'Type', cell: (row) => row.mimeType },
        { header: 'Uploaded', cell: (row) => formatDate(row.createdAt) },
      ]}
    />
  );
}
