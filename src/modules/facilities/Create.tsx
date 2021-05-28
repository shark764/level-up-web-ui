import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '@modules/auth';
import { useForm } from '@modules/common/hooks';
import { uuid } from '@modules/common/utils';
import { ChevronLeftIcon, UserMenu } from '@modules/common/components';
import { Header, Title, SubTitle, PageContent, BackButton } from '@styles/page';
import { useFacilitiesState } from './useFacilitiesState';
import { FacilityForm } from './Form';

export const Create = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { add } = useFacilitiesState();

  const createFacility = async (data: any) => {
    const { facilityName, primaryPhoneNumber, address } = data;
    if (!facilityName || !primaryPhoneNumber || !address) {
      return;
    }

    await add({
      ...data,
      id: uuid(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    history.push('/facilities');
  };

  const { formData, handleInputChange, handleSubmit } = useForm(
    {
      facilityName: '',
      address: '',
      primaryPhoneNumber: '',
      secondaryPhoneNumber: '',
      facilityWebsiteUrl: '',
      facilityType: '',
      socialMedia: [],
      facilityAdministratorName: '',
      facilityAdministratorPhone: '',
      facilityAdministratorEmail: '',
      hoursOfOperation: { opening: '', closing: '' },
      paymentInformation: [],
      nssfMember: false,
      nssfRating: 0,
      rangeIoTEnabled: false,
      rangeMembership: false,
      walkInRangeUsers: false,
      firearmsRentals: false,
      retailSales: false,
      cafeteria: false,
      trainingClasses: false,
      events: false,
      corporateHospitality: false,
      rangeEquipment: false,
      organizedCompetition: false
    },
    createFacility
  );

  return (
    <>
      <Header>
        <div>
          <Title>Facility Creation</Title>
          <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
        </div>
        <UserMenu />
      </Header>
      <PageContent>
        <BackButton onClick={() => history.goBack()}>
          <ChevronLeftIcon />
          Back
        </BackButton>

        <FacilityForm
          formData={formData}
          handleInputChange={handleInputChange}
          onFormSave={handleSubmit}
          isDisabled={false}
          isEditing={false}
        />
      </PageContent>
    </>
  );
};
