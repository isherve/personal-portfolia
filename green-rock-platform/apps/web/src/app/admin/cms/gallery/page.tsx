'use client';

import { DataList } from '@/components/portal/DataList';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  sortOrder: number;
}

export default function CmsGalleryPage() {
  return (
    <DataList<GalleryItem>
      title="CMS — Gallery"
      description="Photo gallery and media"
      endpoint="/cms/gallery"
      emptyMessage="No gallery items."
      columns={[
        { header: 'Title', cell: (row) => row.title },
        { header: 'Category', cell: (row) => row.category },
        { header: 'Order', cell: (row) => String(row.sortOrder) },
      ]}
    />
  );
}
