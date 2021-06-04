import { useCRUD } from '@modules/common/hooks';
import type { DesignerItem } from '@modules/zone-designer/types';

export interface Zone {
  id: string;
  facilityID: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  // Designer Stuff
  diagram?: DesignerItem[];
  diagramImg?: string;
  rows?: number;
  columns?: number;
}

type useZonesStateHook = () => {
  zones: Zone[];
  get: (id: string) => Zone;
  add: (zone: Zone) => void;
  update: (zone: Zone, zoneId: string) => void;
  delete: (zoneId: string) => void;
};

const initialData: Zone[] = [];

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
