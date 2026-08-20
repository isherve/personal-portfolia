'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Invoice {
  id: string;
  invoiceNumber: string;
  payments?: { id: string; amount: number; method: string; paidAt: string; reference?: string }[];
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<
    { id: string; invoiceNumber: string; amount: number; method: string; paidAt: string; reference?: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<{ data: Invoice[] }>('/finance/invoices/mine')
      .then((res) => {
        const all = (res.data ?? []).flatMap((inv) =>
          (inv.payments ?? []).map((p) => ({
            id: p.id,
            invoiceNumber: inv.invoiceNumber,
            amount: Number(p.amount),
            method: p.method,
            paidAt: p.paidAt,
            reference: p.reference,
          }))
        );
        setPayments(all);
      })
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Payments</CardTitle>
        <p className="text-sm text-muted-foreground">Payment history across your invoices</p>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading...
          </div>
        )}
        {!loading && payments.length === 0 && (
          <p className="text-muted-foreground text-sm py-8 text-center">No payments recorded yet.</p>
        )}
        {!loading && payments.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Invoice</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Method</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Reference</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-2 font-medium">{p.invoiceNumber}</td>
                    <td className="py-3 px-2">{formatCurrency(p.amount)}</td>
                    <td className="py-3 px-2">{p.method}</td>
                    <td className="py-3 px-2">{p.reference ?? '—'}</td>
                    <td className="py-3 px-2">{formatDate(p.paidAt)}</td>
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
