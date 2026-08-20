import type { Metadata } from 'next';
import { BlogClient } from './blog-client';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Green Rock blog — real estate insights, construction tips, and industry news from Rwanda.',
};

export default function BlogPage() {
  return <BlogClient />;
}
