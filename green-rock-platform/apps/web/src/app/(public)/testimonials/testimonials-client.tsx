'use client';

import { useEffect, useState } from 'react';
import { Star, Quote, Loader2 } from 'lucide-react';
import { publicApi } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating: number;
  avatarUrl?: string;
}

export function TestimonialsClient() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    publicApi.getTestimonials()
      .then((res) => setTestimonials(res.data as Testimonial[]))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load testimonials'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Testimonials</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Hear from clients who have trusted Green Rock for their property, construction, and materials needs.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <div className="text-center py-20 text-muted-foreground">
              <p>{error}</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
            </div>
          )}

          {!loading && !error && testimonials.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <Quote className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No testimonials available yet.</p>
            </div>
          )}

          {!loading && !error && testimonials.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <Card key={t.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Quote className="h-8 w-8 text-primary/30 mb-4" />
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < t.rating ? 'fill-accent text-accent' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      {t.avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={t.avatarUrl} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          {t.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">{t.name}</p>
                        {(t.role || t.company) && (
                          <p className="text-sm text-muted-foreground">
                            {[t.role, t.company].filter(Boolean).join(' · ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
