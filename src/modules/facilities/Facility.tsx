import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '@modules/auth';
import { useForm, useQuery } from '@modules/common/hooks';
import {
  ChevronLeftIcon,
  Pencil1Icon,
  TrashIcon,
  UserMenu
} from '@modules/common/components';
import { Header, Title, SubTitle, PageContent } from '@styles/page';
import { Button } from '@styles/button';
import { InputGroup, Input } from '@styles/form';
import { useFacilitiesState } from './useFacilitiesState';
import { styled } from 'stitches.config';

const BackButton = styled(Button, {
  gap: '$3',
  padding: 0,
  background: 'none',
  color: '$royalPurple',
  cursor: 'pointer',
  fontSize: '$bodyLarge'
});

const FacilityID = styled('h3', {
  fontWeight: 'normal',
  '& span': {
    fontWeight: 'bold'
  }
});

const DetailsHeader = styled('header', {
  marginY: '$4',
  '& *': {
    margin: 0
  }
});

const DetailsHeaderMain = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const DetailsHeaderSecondary = styled('div', {
  display: 'flex',
  gap: '$4',
  color: '$charcoalLight'
});

const Form = styled('form', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '32px',
  width: '100%',
  marginBottom: '64px',

  [`& ${InputGroup}`]: {
    flexBasis: 'calc(50% - 16px)'
  },
  [`& ${InputGroup}:last-child`]: {
    flexBasis: '100%'
  }
});

export const Facility = () => {
  const urlQuery = useQuery();
  const urlAction = urlQuery.get('action');

  const history = useHistory();
  const { id } = useParams() as { id: string };
  const { user } = useAuth();
  const { get, update } = useFacilitiesState();

  const facility = get(id);
  const createdDate = new Date(facility.createdAt);
  const updatedDate = new Date(facility.createdAt);

  const [isEditing, setIsEditing] = useState(urlAction === 'edit');
  const { formData, handleInputChange } = useForm({
    name: facility.name,
    phoneNumber: facility.phoneNumber,
    address: facility.address
  });

  const updateFacility = () => {
    update({ ...facility, ...formData, updatedAt: Date.now() }, id);
    setIsEditing(false);
  };

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
            <FacilityID>
              <span>ID: </span>
              {id}
            </FacilityID>
            {isEditing ? (
              <Button color='danger'>
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

        <Form>
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
              type='textarea'
              name='address'
              value={formData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </InputGroup>
        </Form>

        {isEditing ? (
          <Button color='purple' onClick={updateFacility}>
            Save
          </Button>
        ) : (
          <Button color='green'>Filter Zones By This Facility</Button>
        )}
      </PageContent>
    </>
  );
};
