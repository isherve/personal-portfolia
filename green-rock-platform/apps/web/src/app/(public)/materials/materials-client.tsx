'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Package, Search, Loader2, TreePine } from 'lucide-react';
import { publicApi } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category: string;
  unit: string;
  price: string | number;
  currency: string;
  isTimber: boolean;
  timberGrade?: string;
  imageUrl?: string;
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'BUILDING_MATERIALS', label: 'Building Materials' },
  { value: 'TIMBER', label: 'Timber' },
  { value: 'PAINT', label: 'Paint' },
  { value: 'HARDWARE', label: 'Hardware' },
  { value: 'TOOLS', label: 'Tools' },
  { value: 'OTHER', label: 'Other' },
];

export function MaterialsClient() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [timberOnly, setTimberOnly] = useState(searchParams.get('timber') === 'true');

  useEffect(() => {
    if (searchParams.get('timber') === 'true') setTimberOnly(true);
  }, [searchParams]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params: Record<string, string> = {};
      if (category) params.category = category;
      if (timberOnly) params.timber = 'true';
      const res = await publicApi.getProducts(params);
      let items = res.data as Product[];
      if (search) {
        const q = search.toLowerCase();
        items = items.filter(
          (p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
        );
      }
      setProducts(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [category, timberOnly, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Building Materials</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Quality building materials, timber, and supplies for every construction project — available for inquiry and order.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <Button
                  variant={timberOnly ? 'default' : 'outline'}
                  onClick={() => setTimberOnly(!timberOnly)}
                  className="gap-2"
                >
                  <TreePine className="h-4 w-4" /> Timber Only
                </Button>
              </div>
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
              <Button variant="outline" className="mt-4" onClick={fetchProducts}>Retry</Button>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No products found.</p>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => {
                const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
                const imageUrl = product.imageUrl || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80';
                return (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative overflow-hidden bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      {product.isTimber && (
                        <span className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <TreePine className="h-3 w-3" /> Timber
                        </span>
                      )}
                    </div>
                    <CardContent className="pt-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        {product.category.replace(/_/g, ' ')}
                      </p>
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
                      )}
                      <p className="text-lg font-bold text-primary">
                        {product.currency} {new Intl.NumberFormat('en-RW').format(price)}
                        <span className="text-sm font-normal text-muted-foreground"> / {product.unit}</span>
                      </p>
                      {product.timberGrade && (
                        <p className="text-xs text-muted-foreground mt-1">Grade: {product.timberGrade}</p>
                      )}
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
