'use client';

import Link from 'next/link';
import { ArrowRight, Building2, Hammer, Package, Paintbrush, TreePine, Home, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useI18n } from '@/i18n/provider';

const services = [
  { icon: Home, title: 'Real Estate', desc: 'Property sales, rentals, and listings' },
  { icon: Hammer, title: 'Construction', desc: 'Full-service construction and renovation' },
  { icon: Package, title: 'Building Materials', desc: 'Quality materials for every project' },
  { icon: TreePine, title: 'Timber', desc: 'Premium timber products and supply' },
  { icon: Building2, title: 'Interior Design', desc: 'Transform spaces with expert design' },
  { icon: Paintbrush, title: 'Painting Services', desc: 'Professional interior and exterior painting' },
];

export default function HomePage() {
  const { t } = useI18n();

  return (
    <>
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/properties">{t.hero.cta} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">{t.hero.cta2}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Comprehensive solutions across nine business sectors
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Projects Completed' },
              { value: '1,200+', label: 'Properties Listed' },
              { value: '15+', label: 'Years Experience' },
              { value: '98%', label: 'Client Satisfaction' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-4xl font-bold text-primary mb-2">{value}</div>
                <div className="text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Star className="h-12 w-12 mx-auto mb-4 opacity-80" />
          <h2 className="font-display text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="mb-8 opacity-90 max-w-xl mx-auto">
            Contact us today for a free consultation on your real estate, construction, or materials needs.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
