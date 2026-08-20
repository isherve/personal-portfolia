import type { Metadata } from 'next';
import { PropertiesClient } from './properties-client';

export const metadata: Metadata = {
  title: 'Properties',
  description: 'Browse property listings for sale and rent across Rwanda — residential, commercial, and land.',
};

export default function PropertiesPage() {
  return <PropertiesClient />;
}
