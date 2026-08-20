import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Home, Hammer, Package, TreePine, Building2, Paintbrush,
  KeyRound, Ruler, Wrench,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore all nine business sectors at Green Rock — real estate, construction, building materials, timber, interior design, painting, and more.',
};

const services = [
  { icon: Home, title: 'Real Estate', desc: 'Property sales, rentals, and professional listings across residential and commercial markets.', href: '/properties' },
  { icon: Hammer, title: 'Construction', desc: 'Full-service construction from foundation to finish — residential, commercial, and industrial.', href: '/projects' },
  { icon: Package, title: 'Building Materials', desc: 'Quality cement, steel, blocks, and supplies delivered to your project site.', href: '/materials' },
  { icon: TreePine, title: 'Timber Supply', desc: 'Premium graded timber products for framing, finishing, and custom woodworking.', href: '/materials?timber=true' },
  { icon: Building2, title: 'Interior Design', desc: 'Transform spaces with expert design consultation, space planning, and material selection.', href: '/contact' },
  { icon: Paintbrush, title: 'Painting Services', desc: 'Professional interior and exterior painting with premium finishes and coatings.', href: '/contact' },
  { icon: KeyRound, title: 'Property Management', desc: 'End-to-end management for landlords — tenant screening, maintenance, and rent collection.', href: '/contact' },
  { icon: Ruler, title: 'Architecture & Planning', desc: 'Architectural design, permits, and project planning for new builds and renovations.', href: '/contact' },
  { icon: Wrench, title: 'Renovation & Remodeling', desc: 'Upgrade and restore existing properties with modern standards and sustainable materials.', href: '/projects' },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Comprehensive solutions across nine business sectors — from finding your dream home to
            supplying materials for large-scale construction projects.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc, href }) => (
              <Card key={title} className="hover:shadow-lg transition-shadow flex flex-col">
                <CardContent className="pt-6 flex flex-col flex-1">
                  <Icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{desc}</p>
                  <Button asChild variant="outline" size="sm" className="w-fit">
                    <Link href={href}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
