'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface Column<T> {
  header: string;
  cell: (row: T) => React.ReactNode;
}

interface DataListProps<T> {
  title: string;
  description?: string;
  endpoint: string;
  columns: Column<T>[];
  emptyMessage?: string;
  getRowKey?: (row: T) => string;
}

export function DataList<T extends Record<string, unknown>>({
  title,
  description,
  endpoint,
  columns,
  emptyMessage = 'No records found.',
  getRowKey = (row) => String(row.id),
}: DataListProps<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api<{ data: T[] }>(endpoint)
      .then((res) => setRows(Array.isArray(res.data) ? res.data : []))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading...
          </div>
        )}
        {error && <p className="text-destructive text-sm py-4">{error}</p>}
        {!loading && !error && rows.length === 0 && (
          <p className="text-muted-foreground text-sm py-8 text-center">{emptyMessage}</p>
        )}
        {!loading && !error && rows.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  {columns.map((col) => (
                    <th key={col.header} className="text-left py-3 px-2 font-medium text-muted-foreground">
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={getRowKey(row)} className="border-b last:border-0 hover:bg-muted/50">
                    {columns.map((col) => (
                      <td key={col.header} className="py-3 px-2">
                        {col.cell(row)}
                      </td>
                    ))}
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
