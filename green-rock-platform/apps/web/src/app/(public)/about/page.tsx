import type { Metadata } from 'next';
import { Target, Eye, Heart, Shield, Users, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Green Rock General Supply Ltd — our mission, vision, and values driving excellence in real estate, construction, and building materials across Rwanda.',
};

const values = [
  { icon: Shield, title: 'Integrity', desc: 'We conduct business with honesty, transparency, and accountability in every transaction.' },
  { icon: Users, title: 'Client Focus', desc: 'Our clients\' success is our success. We listen, adapt, and deliver beyond expectations.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'We embrace modern techniques and sustainable practices to build smarter, greener solutions.' },
  { icon: Heart, title: 'Community', desc: 'We invest in Rwanda\'s growth, creating jobs and supporting local communities.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">About Green Rock</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Green Rock General Supply Ltd is Rwanda&apos;s trusted partner for real estate, construction,
            building materials, timber, interior design, and painting services — delivering excellence since 2009.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <Card className="border-primary/20">
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="font-display text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To provide comprehensive, high-quality solutions across real estate, construction, and
                  building supply sectors — empowering individuals and businesses to build, buy, and transform
                  spaces with confidence and value.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader>
                <Eye className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="font-display text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be East Africa&apos;s leading integrated property and construction enterprise — recognized
                  for sustainable practices, exceptional service, and transformative impact on the built environment.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="font-display text-3xl font-bold text-center mb-4">Our Values</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            The principles that guide every project, partnership, and promise we make.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-8">Our Story</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Founded in Kigali, Green Rock began as a building materials supplier and has grown into a
            full-service enterprise spanning nine business sectors. With over 500 completed projects and
            1,200+ properties listed, we combine local expertise with enterprise-grade systems to serve
            clients across Rwanda and the region.
          </p>
        </div>
      </section>
    </>
  );
}
