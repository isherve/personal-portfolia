import type { Metadata } from 'next';
import { ContactClient } from './contact-client';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Green Rock for property inquiries, construction quotes, and building material orders in Rwanda.',
};

export default function ContactPage() {
  return <ContactClient />;
}
