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

export const useZonesState: useZonesStateHook = () => {
  const { state, add, update, delete: remove } = useCRUD([], 'zones');

  return {
    zones: state,
    get: (id) => state.find((item: Zone) => item.id === id),
    add: (zone) => add(zone),
    update: (zone, zoneId) => update(zone, zoneId),
    delete: (zoneId) => remove(zoneId)
  };
};
