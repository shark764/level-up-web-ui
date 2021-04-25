import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '@modules/auth';
import { useFacilitiesState } from '@modules/facilities';
import { useForm, useQuery } from '@modules/common/hooks';
import {
  ChevronLeftIcon,
  UserMenu,
  TrashIcon,
  Pencil1Icon
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
import { useZonesState } from './useZonesState';

export const Zone = () => {
  const urlQuery = useQuery();
  const urlAction = urlQuery.get('action');

  const history = useHistory();
  const { id } = useParams() as { id: string };

  const { user } = useAuth();
  const { get, update } = useZonesState();
  const { facilities } = useFacilitiesState();

  const zone = get(id);
  const createdDate = new Date(zone.createdAt);
  const updatedDate = new Date(zone.updatedAt);

  const [isEditing, setIsEditing] = useState(urlAction === 'edit');
  const { formData, handleInputChange } = useForm({
    facility: zone.facilityID,
    name: zone.name,
    description: zone.description
  });

  const updateZone = () => {
    const { name, description, facility } = formData;
    if (!name || !description || !facility) {
      return;
    }

    update(
      {
        ...zone,
        name,
        description,
        updatedAt: Date.now()
      },
      id
    );

    setIsEditing(false);
  };

  return (
    <>
      <Header>
        <div>
          <Title>Zone Creation</Title>
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

        <Form onSubmit={(e) => e.preventDefault()}>
          <InputGroup>
            <h4>Facility</h4>
            <Input
              as='select'
              name='facility'
              value={formData.facility}
              onChange={handleInputChange}
              disabled
            >
              {facilities.length > 0 &&
                facilities.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
            </Input>
          </InputGroup>

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
            <h4>Description</h4>
            <Input
              required
              type='textarea'
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </InputGroup>

          <FormActions>
            {isEditing && (
              <Button color='purple' onClick={updateZone}>
                Save
              </Button>
            )}
          </FormActions>
        </Form>
      </PageContent>
    </>
  );
};
