import type { Metadata } from 'next';
import { MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Browse Green Rock\'s portfolio of completed and ongoing construction projects across Rwanda.',
};

const projects = [
  {
    title: 'Kigali Heights Residences',
    location: 'Kigali, Rwanda',
    type: 'Residential',
    status: 'Completed',
    year: '2024',
    description: 'A 48-unit luxury apartment complex with modern amenities and green building certification.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  },
  {
    title: 'Green Valley Commercial Center',
    location: 'Musanze, Rwanda',
    type: 'Commercial',
    status: 'Completed',
    year: '2023',
    description: 'Mixed-use retail and office space spanning 12,000 sqm in the heart of Musanze.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  },
  {
    title: 'Lake View Estate',
    location: 'Rubavu, Rwanda',
    type: 'Residential',
    status: 'In Progress',
    year: '2025',
    description: 'Waterfront villa development with 24 premium homes overlooking Lake Kivu.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
  {
    title: 'Kigali Industrial Park Warehouse',
    location: 'Kigali, Rwanda',
    type: 'Industrial',
    status: 'Completed',
    year: '2023',
    description: '15,000 sqm warehouse facility with advanced logistics infrastructure.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
  },
  {
    title: 'Remera School Expansion',
    location: 'Kigali, Rwanda',
    type: 'Institutional',
    status: 'Completed',
    year: '2022',
    description: 'Classroom block and sports facility expansion for 800 additional students.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  {
    title: 'Nyamata Affordable Housing',
    location: 'Bugesera, Rwanda',
    type: 'Residential',
    status: 'In Progress',
    year: '2025',
    description: '120 affordable housing units supporting Rwanda\'s urban development goals.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  },
];

const statusColors: Record<string, string> = {
  Completed: 'bg-primary/10 text-primary',
  'In Progress': 'bg-accent/20 text-accent-foreground',
};

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            A showcase of construction excellence — from residential estates to commercial landmarks
            across Rwanda.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.title} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <span className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>
                <CardContent className="pt-6">
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">{project.type}</span>
                  <h3 className="font-semibold text-lg mt-1 mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> {project.year}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
