'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Setting {
  id: string;
  key: string;
  value: string;
  category: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<{ data: Setting[] }>('/system/settings')
      .then((res) => setSettings(Array.isArray(res.data) ? res.data : []))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">System Settings</CardTitle>
        <p className="text-sm text-muted-foreground">Configure platform settings and preferences</p>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading...
          </div>
        )}
        {error && <p className="text-destructive text-sm">{error}</p>}
        {!loading && !error && settings.length === 0 && (
          <p className="text-muted-foreground text-sm py-8 text-center">No settings configured.</p>
        )}
        {!loading && !error && settings.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Key</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Value</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Category</th>
                </tr>
              </thead>
              <tbody>
                {settings.map((s) => (
                  <tr key={s.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-2 font-medium">{s.key}</td>
                    <td className="py-3 px-2">{s.value}</td>
                    <td className="py-3 px-2">{s.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
