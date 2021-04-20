import { useCRUD } from '@modules/common/hooks';

export interface Facility {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  [key: string]: unknown;
}

const initialData: Facility[] = [
  {
    id: '71de5c51-7d77-4258-8c4d-49f149ec4961',
    name: 'Test Facility',
    address: 'San Salvador, El Salvador',
    phoneNumber: '+1 800 444 4444'
  }
];

export const useFacilitiesState = () => {
  const { state, add, update, delete: remove } = useCRUD(
    initialData,
    'facilities'
  );

  return {
    facilities: state as Facility[],
    add: (facility: Facility) => add(facility),
    update: (facility: Facility, facilityId: string) =>
      update(facility, facilityId),
    delete: (facilityId: string) => remove(facilityId)
  };
};
