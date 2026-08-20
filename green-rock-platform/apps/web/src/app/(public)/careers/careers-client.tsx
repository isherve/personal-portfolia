'use client';

import { useEffect, useState } from 'react';
import { MapPin, Briefcase, Clock, Loader2, CheckCircle } from 'lucide-react';
import { publicApi } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface Career {
  id: string;
  title: string;
  slug: string;
  department?: string;
  location?: string;
  type: string;
  description: string;
  requirements?: string;
  deadline?: string;
}

export function CareersClient() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', resumeUrl: '', coverLetter: '',
  });

  useEffect(() => {
    publicApi.getCareers()
      .then((res) => setCareers(res.data as Career[]))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load careers'))
      .finally(() => setLoading(false));
  }, []);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return;
    setSubmitting(true);
    try {
      await publicApi.applyCareer(selectedId, form);
      setSubmitted(true);
      setForm({ firstName: '', lastName: '', email: '', phone: '', resumeUrl: '', coverLetter: '' });
      setSelectedId(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Application failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Careers</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Join the Green Rock team — build your career with Rwanda&apos;s leading property and construction enterprise.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {submitted && (
            <div className="mb-8 p-4 rounded-lg bg-primary/10 text-primary flex items-center gap-3">
              <CheckCircle className="h-5 w-5" />
              Your application has been submitted successfully. We&apos;ll be in touch soon.
            </div>
          )}

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

          {!loading && !error && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {careers.length === 0 ? (
                  <p className="text-muted-foreground text-center py-12">No open positions at this time.</p>
                ) : (
                  careers.map((career) => (
                    <Card key={career.id} className={selectedId === career.id ? 'ring-2 ring-primary' : ''}>
                      <CardHeader>
                        <CardTitle className="text-xl">{career.title}</CardTitle>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          {career.department && (
                            <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {career.department}</span>
                          )}
                          {career.location && (
                            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {career.location}</span>
                          )}
                          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {career.type.replace(/_/g, ' ')}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4 whitespace-pre-line">{career.description}</p>
                        {career.requirements && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-sm mb-2">Requirements</h4>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">{career.requirements}</p>
                          </div>
                        )}
                        {career.deadline && (
                          <p className="text-xs text-muted-foreground mb-4">
                            Apply by: {new Date(career.deadline).toLocaleDateString()}
                          </p>
                        )}
                        <Button onClick={() => setSelectedId(career.id)} variant={selectedId === career.id ? 'default' : 'outline'}>
                          {selectedId === career.id ? 'Selected' : 'Apply Now'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Application Form</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!selectedId ? (
                      <p className="text-sm text-muted-foreground">Select a position to apply.</p>
                    ) : (
                      <form onSubmit={handleApply} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Input placeholder="First Name" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                          <Input placeholder="Last Name" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                        </div>
                        <Input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        <Input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        <Input placeholder="Resume URL (optional)" value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} />
                        <Textarea placeholder="Cover Letter" rows={4} value={form.coverLetter} onChange={(e) => setForm({ ...form, coverLetter: e.target.value })} />
                        <Button type="submit" className="w-full" disabled={submitting}>
                          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit Application'}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
