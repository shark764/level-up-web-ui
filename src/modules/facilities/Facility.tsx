import React, { useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useAuth } from '@modules/auth';
import { useForm, useQuery } from '@modules/common/hooks';
import {
  ChevronLeftIcon,
  UserMenu,
  AlertDialog,
  TrashCircleIcon
} from '@modules/common/components';
import {
  Header,
  Title,
  SubTitle,
  PageContent,
  BackButton,
  ID,
  DetailsHeader,
  DetailsHeaderMain,
  DetailsHeaderSecondary
} from '@styles/page';
import { useFacilitiesState } from './useFacilitiesState';
import { FacilityForm } from './Form';

export const Facility = () => {
  const urlQuery = useQuery();
  const urlAction = urlQuery.get('action');

  const history = useHistory();
  const { id } = useParams() as { id: string };
  const { user } = useAuth();
  const { get, update, delete: deleteFacility } = useFacilitiesState();
  const facility = get(id);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(urlAction === 'edit');

  const updateFacility = async (data: any) => {
    const { facilityName, primaryPhoneNumber, address } = data;

    if (!facilityName || !primaryPhoneNumber || !address) {
      return;
    }

    update(
      {
        ...facility,
        ...data,
        updatedAt: Date.now()
      },
      id
    );
    setIsEditing(false);
  };

  const { formData, handleInputChange, handleSubmit } = useForm(
    {
      ...facility
    },
    updateFacility
  );

  if (!facility) {
    return <Redirect to='/facilities' />;
  }

  const createdDate = new Date(facility.createdAt);
  const updatedDate = new Date(facility.updatedAt);

  return (
    <>
      <Header>
        <div>
          <Title>Facility Details</Title>
          <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
        </div>
        <UserMenu />
      </Header>

      <PageContent>
        <BackButton onClick={() => history.goBack()}>
          <ChevronLeftIcon />
          Back
        </BackButton>

        <DetailsHeader css={{ marginBottom: '$2' }}>
          <DetailsHeaderMain>
            <ID>
              <span>ID: </span>
              {id}
            </ID>
          </DetailsHeaderMain>
          <DetailsHeaderSecondary css={{ display: 'block' }}>
            <p>Creation Time: {createdDate.toDateString()}</p>
            <p>Last Update: {updatedDate.toDateString()}</p>
          </DetailsHeaderSecondary>
        </DetailsHeader>

        {isEditing && (
          <FacilityForm
            formData={formData}
            handleInputChange={handleInputChange}
            onFormSave={handleSubmit}
            isDisabled={!isEditing}
            isEditing={isEditing}
            onDelete={() => setShowDeleteDialog(true)}
          />
        )}
      </PageContent>
      <AlertDialog
        open={showDeleteDialog}
        title='Are you sure you want to delete this Facility?'
        titleColor='danger'
        description='Once the data is deleted it cannot be recovered'
        color='danger'
        icon={<TrashCircleIcon fill='#F83f3f' />}
        onCancel={() => setShowDeleteDialog(false)}
        onAccept={async () => {
          setShowDeleteDialog(false);
          deleteFacility(id);
        }}
      />
    </>
  );
};
