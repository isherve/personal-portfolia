import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { MaterialsClient } from './materials-client';

export const metadata: Metadata = {
  title: 'Building Materials',
  description: 'Browse our catalog of building materials, timber, paint, hardware, and construction supplies.',
};

export default function MaterialsPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <MaterialsClient />
    </Suspense>
  );
}
