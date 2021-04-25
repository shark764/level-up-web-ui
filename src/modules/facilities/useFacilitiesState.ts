import { useCRUD } from '@modules/common/hooks';

export interface Facility {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  createdAt: number;
  updatedAt: number;
}

type useFacilitiesStateHook = () => {
  facilities: Facility[];
  get: (id: string) => Facility;
  add: (facility: Facility) => void;
  update: (facility: Facility, facilityId: string) => void;
  delete: (facilityId: string) => void;
};

const initialData: Facility[] = [
  {
    id: '71de5c51-7d77-4258-8c4d-49f149ec4961',
    name: 'Test Facility',
    address: 'San Salvador, El Salvador',
    phoneNumber: '+1 800 444 4444',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

export const useFacilitiesState: useFacilitiesStateHook = () => {
  const { state, add, update, delete: remove } = useCRUD(
    initialData,
    'facilities'
  );

  return {
    facilities: state as Facility[],
    get: (id) => state.find((item: Facility) => item.id === id),
    add: (facility) => add(facility),
    update: (facility, facilityId) => update(facility, facilityId),
    delete: (facilityId) => remove(facilityId)
  };
};
