import type { Metadata } from 'next';
import { CareersClient } from './careers-client';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Explore career opportunities at Green Rock General Supply Ltd and apply to join our team in Rwanda.',
};

export default function CareersPage() {
  return <CareersClient />;
}
