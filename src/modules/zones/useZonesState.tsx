import { useCRUD } from '@modules/common/hooks';

interface Equipment {
  id: string;
  name: string;
}

export interface Zone {
  id: string;
  facilityID: string;
  name: string;
  description: string;
  equipment?: Equipment[];
  createdAt: number;
  updatedAt: number;
}

type useZonesStateHook = () => {
  zones: Zone[];
  get: (id: string) => Zone;
  add: (zone: Zone) => void;
  update: (zone: Zone, zoneId: string) => void;
  delete: (zoneId: string) => void;
};

const initialData: Zone[] = [
  {
    id: 'cb14f56f-54b2-432a-a6e8-0000f9ea8c6b',
    facilityID: '71de5c51-7d77-4258-8c4d-49f149ec4961',
    name: 'Test Zone',
    description: 'Test Zone Description',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

export const useZonesState: useZonesStateHook = () => {
  const { state, add, update, delete: remove } = useCRUD(initialData, 'zones');

  return {
    zones: state,
    get: (id) => state.find((item: Zone) => item.id === id),
    add: (zone) => add(zone),
    update: (zone, zoneId) => update(zone, zoneId),
    delete: (zoneId) => remove(zoneId)
  };
};
