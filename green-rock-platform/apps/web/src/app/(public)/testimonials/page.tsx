import type { Metadata } from 'next';
import { TestimonialsClient } from './testimonials-client';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Read what our clients say about Green Rock — real estate, construction, and building materials in Rwanda.',
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
