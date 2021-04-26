import React, { useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useAuth } from '@modules/auth';
import { useForm, useQuery } from '@modules/common/hooks';
import {
  ChevronLeftIcon,
  Pencil1Icon,
  TrashIcon,
  UserMenu,
  AlertDialog
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
import { Button } from '@styles/button';
import { InputGroup, Input, Form, FormActions } from '@styles/form';
import { useFacilitiesState } from './useFacilitiesState';

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
  const { formData, handleInputChange } = useForm({
    name: facility?.name,
    phoneNumber: facility?.phoneNumber,
    address: facility?.address
  });

  const updateFacility = () => {
    const { name, phoneNumber, address } = formData;

    if (!name || !phoneNumber || !address) {
      return;
    }

    update(
      { ...facility, name, phoneNumber, address, updatedAt: Date.now() },
      id
    );
    setIsEditing(false);
  };

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

        <DetailsHeader>
          <DetailsHeaderMain>
            <ID>
              <span>ID: </span>
              {id}
            </ID>
            {isEditing ? (
              <Button color='danger' onClick={() => setShowDeleteDialog(true)}>
                Delete <TrashIcon />
              </Button>
            ) : (
              <Button color='purple' onClick={() => setIsEditing(true)}>
                Edit <Pencil1Icon />
              </Button>
            )}
          </DetailsHeaderMain>
          <DetailsHeaderSecondary>
            <p>Created: {createdDate.toDateString()}</p>
            <p>Updated: {updatedDate.toDateString()}</p>
          </DetailsHeaderSecondary>
        </DetailsHeader>

        <Form onSubmit={(e) => e.preventDefault()}>
          <InputGroup>
            <h4>Name</h4>
            <Input
              required
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </InputGroup>

          <InputGroup>
            <h4>Phone Number</h4>
            <Input
              required
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </InputGroup>

          <InputGroup>
            <h4>Address</h4>
            <Input
              required
              as='textarea'
              name='address'
              css={{ minHeight: 96 }}
              value={formData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </InputGroup>

          <FormActions>
            {isEditing ? (
              <Button color='purple' onClick={updateFacility}>
                Save
              </Button>
            ) : (
              <Button
                color='green'
                onClick={() => history.push(`/zones?facility=${id}`)}
              >
                Filter Zones By This Facility
              </Button>
            )}
          </FormActions>
        </Form>
      </PageContent>
      <AlertDialog
        open={showDeleteDialog}
        title='Are you sure you want to delete this Facility'
        description='Once the data is deleted it cannot be recovered'
        color='danger'
        icon={<TrashIcon />}
        onCancel={() => setShowDeleteDialog(false)}
        onAccept={async () => {
          setShowDeleteDialog(false);
          deleteFacility(id);
        }}
      />
    </>
  );
};
