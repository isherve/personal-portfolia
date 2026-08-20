'use client';

import { useState } from 'react';
import { Clock, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AttendancePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recordAttendance = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const res = await api<{ message?: string }>('/hr/attendance', { method: 'POST', body: JSON.stringify({}) });
      setMessage(res.message ?? 'Attendance recorded.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Attendance</CardTitle>
        <p className="text-sm text-muted-foreground">Clock in or clock out for today</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={recordAttendance} disabled={loading} className="w-full">
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Clock className="h-4 w-4 mr-2" />}
          Record Attendance
        </Button>
        {message && <p className="text-sm text-green-600">{message}</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </CardContent>
    </Card>
  );
}
