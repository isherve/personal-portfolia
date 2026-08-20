'use client';

import { useEffect, useState, useCallback } from 'react';
import { MapPin, Bed, Bath, Maximize, Search, Loader2 } from 'lucide-react';
import { publicApi } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Listing {
  id: string;
  type: 'SALE' | 'RENT';
  price: string | number;
  currency: string;
  rentPeriod?: string;
}

interface PropertyMedia {
  url: string;
}

interface Property {
  id: string;
  title: string;
  slug: string;
  address: string;
  city: string;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  areaSqm?: number;
  listings: Listing[];
  media: PropertyMedia[];
}

function formatPrice(price: string | number, currency: string, type: string, rentPeriod?: string) {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  const formatted = new Intl.NumberFormat('en-RW').format(num);
  const suffix = type === 'RENT' ? (rentPeriod ? `/${rentPeriod}` : '/mo') : '';
  return `${currency} ${formatted}${suffix}`;
}

export function PropertiesClient() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params: Record<string, string> = {};
      if (search) params.search = search;
      if (city) params.city = city;
      if (type) params.type = type;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      const res = await publicApi.getListings(params);
      setProperties(res.data as Property[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  }, [search, city, type, minPrice, maxPrice]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchListings();
  };

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Properties</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Browse our curated listings — homes, commercial spaces, and land for sale or rent across Rwanda.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="lg:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search properties..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">All Types</option>
                  <option value="SALE">For Sale</option>
                  <option value="RENT">For Rent</option>
                </select>
                <Input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                <Input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                <Button type="submit" className="lg:col-span-6 w-fit">Apply Filters</Button>
              </form>
            </CardContent>
          </Card>

          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <div className="text-center py-20 text-muted-foreground">
              <p>{error}</p>
              <Button variant="outline" className="mt-4" onClick={fetchListings}>Retry</Button>
            </div>
          )}

          {!loading && !error && properties.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p>No properties found matching your criteria.</p>
            </div>
          )}

          {!loading && !error && properties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => {
                const listing = property.listings[0];
                const imageUrl = property.media[0]?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80';
                return (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageUrl} alt={property.title} className="w-full h-full object-cover" />
                      {listing && (
                        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                          {listing.type === 'SALE' ? 'For Sale' : 'For Rent'}
                        </span>
                      )}
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                        <MapPin className="h-3.5 w-3.5" /> {property.address}, {property.city}
                      </p>
                      {listing && (
                        <p className="text-lg font-bold text-primary mb-3">
                          {formatPrice(listing.price, listing.currency, listing.type, listing.rentPeriod)}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {property.bedrooms != null && (
                          <span className="flex items-center gap-1"><Bed className="h-4 w-4" /> {property.bedrooms}</span>
                        )}
                        {property.bathrooms != null && (
                          <span className="flex items-center gap-1"><Bath className="h-4 w-4" /> {property.bathrooms}</span>
                        )}
                        {property.areaSqm != null && (
                          <span className="flex items-center gap-1"><Maximize className="h-4 w-4" /> {property.areaSqm} m²</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
