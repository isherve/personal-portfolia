import type { Metadata } from 'next';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore our portfolio of construction projects, properties, and completed works.',
};

const galleryImages = [
  { title: 'Modern Residence', category: 'Residential', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
  { title: 'Commercial Tower', category: 'Commercial', url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80' },
  { title: 'Interior Design', category: 'Interior', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80' },
  { title: 'Construction Site', category: 'Construction', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' },
  { title: 'Timber Workshop', category: 'Timber', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80' },
  { title: 'Luxury Villa', category: 'Residential', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80' },
  { title: 'Building Materials', category: 'Materials', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80' },
  { title: 'Painted Facade', category: 'Painting', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80' },
  { title: 'Urban Development', category: 'Commercial', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80' },
  { title: 'Landscape Design', category: 'Exterior', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80' },
  { title: 'Warehouse Project', category: 'Industrial', url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80' },
  { title: 'Renovation Work', category: 'Renovation', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80' },
];

export default function GalleryPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Visual highlights from our construction projects, property developments, and design work.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {galleryImages.map((item) => (
              <Card key={item.title} className="overflow-hidden group cursor-pointer">
                <div className="aspect-square relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-xs uppercase tracking-wide opacity-80">{item.category}</p>
                      <p className="font-semibold">{item.title}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
