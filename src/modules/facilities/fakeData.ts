import {
  facilitySocialMedias,
  facilityTypes,
  paymentMethods,
  timeHoursAmPm
} from '@modules/common/utils';
import * as faker from 'faker';
import { Facility, SocialMedia } from './useFacilitiesState';

const facilityItem = (): Facility => ({
  id: faker.datatype.uuid(),
  facilityName: faker.company.companyName(),
  address: faker.address.streetAddress(),
  primaryPhoneNumber: faker.phone.phoneNumber(faker.phone.phoneNumberFormat(1)),
  secondaryPhoneNumber: faker.datatype.boolean()
    ? faker.phone.phoneNumber(faker.phone.phoneNumberFormat(1))
    : '',
  facilityWebsiteUrl: faker.internet.url(),
  facilityType: facilityTypes[faker.datatype.number(2)],
  facilityAdministratorName: faker.name.findName(),
  facilityAdministratorPhone: faker.phone.phoneNumber(
    faker.phone.phoneNumberFormat(1)
  ),
  facilityAdministratorEmail: faker.internet.email(),
  paymentInformation: paymentMethods.filter(
    (_, index: number) => index <= faker.datatype.number(3)
  ),
  nssfMember: faker.datatype.boolean(),
  nssfRating: faker.datatype.number(5),
  rangeIoTEnabled: faker.datatype.boolean(),
  rangeMembership: faker.datatype.boolean(),
  walkInRangeUsers: faker.datatype.boolean(),
  firearmsRentals: faker.datatype.boolean(),
  retailSales: faker.datatype.boolean(),
  retailSalesDetail: {
    unrestrictedItems: new Array(faker.datatype.number(10))
      .fill('')
      .map(() => faker.commerce.productName()),
    restrictedItems: new Array(faker.datatype.number(10))
      .fill('')
      .map(() => faker.commerce.productName())
  },
  cafeteria: faker.datatype.boolean(),
  cafeteriaDetail: {
    size: faker.datatype.number(100),
    food: faker.datatype.boolean(),
    beverage: faker.datatype.boolean(),
    alcohol: faker.datatype.boolean(),
    snacks: faker.datatype.boolean(),
    vendingMachines: faker.datatype.boolean()
  },
  trainingClasses: faker.datatype.boolean(),
  trainingClassesDetail: {
    youthPrograms: new Array(faker.datatype.number(10))
      .fill('')
      .map(() => faker.name.jobDescriptor()),
    privateInstruction: new Array(faker.datatype.number(10))
      .fill('')
      .map(() => faker.name.jobTitle())
  },
  events: faker.datatype.boolean(),
  eventList: new Array(faker.datatype.number(10))
    .fill('')
    .map(() => faker.lorem.sentence()),
  corporateHospitality: faker.datatype.boolean(),
  rangeEquipment: faker.datatype.boolean(),
  rangeEquipmentDetail: {
    airFiltering: faker.datatype.boolean(),
    airFilteringManufacturers: new Array(faker.datatype.number(5))
      .fill('')
      .map(() => faker.company.companyName()),
    carriers: faker.datatype.boolean(),
    carriersManufacturers: new Array(faker.datatype.number(5))
      .fill('')
      .map(() => faker.company.companyName()),
    stalls: faker.datatype.boolean(),
    stallsManufacturers: new Array(faker.datatype.number(5))
      .fill('')
      .map(() => faker.company.companyName()),
    virtualExperience: faker.datatype.boolean(),
    virtualExperienceManufacturers: new Array(faker.datatype.number(5))
      .fill('')
      .map(() => faker.company.companyName())
  },
  organizedCompetition: faker.datatype.boolean(),
  createdAt: faker.date.past().getTime(),
  updatedAt: faker.date.recent().getTime(),
  socialMedia: facilitySocialMedias
    .filter((_, index: number) => index <= faker.datatype.number(4))
    .map((fSocialMedia: SocialMedia) => ({
      socialMedia: fSocialMedia,
      socialMediaUrl: faker.internet.url()
    })),
  hoursOfOperation: {
    opening: timeHoursAmPm[faker.datatype.number(13)],
    closing: timeHoursAmPm[faker.datatype.number(13)]
  }
});

export const facilitiesList: Facility[] = new Array(25)
  .fill({})
  .map(facilityItem);
