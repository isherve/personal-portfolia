'use client';

import { DataList } from '@/components/portal/DataList';

interface Vehicle {
  id: string;
  plateNumber: string;
  make: string;
  model: string;
  status: string;
}

export default function FleetPage() {
  return (
    <DataList<Vehicle>
      title="Fleet Management"
      description="Vehicles and delivery fleet"
      endpoint="/fleet/vehicles"
      emptyMessage="No vehicles registered."
      columns={[
        { header: 'Plate', cell: (row) => row.plateNumber },
        { header: 'Make', cell: (row) => row.make },
        { header: 'Model', cell: (row) => row.model },
        { header: 'Status', cell: (row) => row.status },
      ]}
    />
  );
}
