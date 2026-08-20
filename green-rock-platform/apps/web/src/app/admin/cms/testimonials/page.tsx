'use client';

import { DataList } from '@/components/portal/DataList';

interface Testimonial {
  id: string;
  authorName: string;
  company?: string;
  rating: number;
  isPublished: boolean;
}

export default function CmsTestimonialsPage() {
  return (
    <DataList<Testimonial>
      title="CMS — Testimonials"
      description="Customer testimonials and reviews"
      endpoint="/cms/testimonials"
      emptyMessage="No testimonials."
      columns={[
        { header: 'Author', cell: (row) => row.authorName },
        { header: 'Company', cell: (row) => row.company ?? '—' },
        { header: 'Rating', cell: (row) => `${row.rating}/5` },
        { header: 'Published', cell: (row) => (row.isPublished ? 'Yes' : 'No') },
      ]}
    />
  );
}
