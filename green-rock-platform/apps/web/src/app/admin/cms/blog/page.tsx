'use client';

import { DataList } from '@/components/portal/DataList';
import { formatDate } from '@/lib/utils';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt?: string;
}

export default function CmsBlogPage() {
  return (
    <DataList<BlogPost>
      title="CMS — Blog"
      description="Blog posts and articles"
      endpoint="/cms/blog"
      emptyMessage="No blog posts."
      columns={[
        { header: 'Title', cell: (row) => row.title },
        { header: 'Slug', cell: (row) => row.slug },
        { header: 'Status', cell: (row) => row.status },
        { header: 'Published', cell: (row) => (row.publishedAt ? formatDate(row.publishedAt) : '—') },
      ]}
    />
  );
}
