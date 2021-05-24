import { useCRUD } from '@modules/common/hooks';
import { facilitiesList } from './fakeData';

export interface Facility {
  id: string;
  facilityName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber: string;
  facilityWebsiteUrl: string;
  facilityType: string;
  facilitySize: number;
  facilityBuildingSize: number;
  numberOfZones: number;
  socialMedia: string;
  socialMediaUrl: string;
  facilityAdministratorName: string;
  facilityAdministratorPhone: string;
  facilityAdministratorEmail: string;
  hoursOfOperation: string;
  paymentInformation: string;
  nssfMember: boolean;
  nssfRating: number;
  rangeIoTEnabled: boolean;
  facilityServices: string;
  category: string;
  subcategory: string;
  secuence: number;
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

const initialData: Facility[] = [...facilitiesList];

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
