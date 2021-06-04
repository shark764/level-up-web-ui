import { useCRUD } from '@modules/common/hooks';
import { facilitiesList } from './fakeData';

export type FacilityType = 'Indoor' | 'Outdoor' | 'Both';
export type SocialMedia =
  | 'Twitter'
  | 'Facebook'
  | 'WhatsApp'
  | 'Instagram'
  | 'TikTok';
export type FacilitySocialMedia = {
  socialMedia: SocialMedia;
  socialMediaUrl: string;
};
export type PaymentMethod = 'Credit Card' | 'Bank Account' | 'PayPal' | 'Check';

export type RetailSalesDetail = {
  unrestrictedItems: string[];
  restrictedItems: string[];
};
export type CafeteriaDetail = {
  size: number;
  food: boolean;
  beverage: boolean;
  alcohol: boolean;
  snacks: boolean;
  vendingMachines: boolean;
};
export type TrainingClassesDetail = {
  youthPrograms: string[];
  privateInstruction: string[];
};
export type RangeEquipmentDetail = {
  airFiltering: boolean;
  airFilteringManufacturers: string[];
  carriers: boolean;
  carriersManufacturers: string[];
  stalls: boolean;
  stallsManufacturers: string[];
  virtualExperience: boolean;
  virtualExperienceManufacturers: string[];
};

export interface Facility {
  id: string;
  facilityName: string;
  address: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber: string;
  facilityWebsiteUrl: string;
  facilityType: FacilityType;
  socialMedia: FacilitySocialMedia[];
  facilityAdministratorName: string;
  facilityAdministratorPhone: string;
  facilityAdministratorEmail: string;
  hoursOfOperation: { opening: string; closing: string };
  paymentInformation: PaymentMethod[];
  nssfMember: boolean;
  nssfRating: number;
  rangeIoTEnabled: boolean;
  rangeMembership: boolean;
  walkInRangeUsers: boolean;
  firearmsRentals: boolean;
  retailSales: boolean;
  retailSalesDetail: RetailSalesDetail;
  cafeteria: boolean;
  cafeteriaDetail: CafeteriaDetail;
  trainingClasses: boolean;
  trainingClassesDetail: TrainingClassesDetail;
  events: boolean;
  eventList: string[];
  corporateHospitality: boolean;
  rangeEquipment: boolean;
  rangeEquipmentDetail: RangeEquipmentDetail;
  organizedCompetition: boolean;
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
