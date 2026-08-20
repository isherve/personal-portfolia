import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create a Green Rock customer account to browse properties and manage your projects.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
