import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '@modules/auth';
import { useFacilitiesState } from '@modules/facilities';
import { useForm } from '@modules/common/hooks';
import { uuid } from '@modules/common/utils';
import { ChevronLeftIcon, UserMenu } from '@modules/common/components';
import { Header, Title, SubTitle, PageContent, BackButton } from '@styles/page';
import { Button } from '@styles/button';
import { InputGroup, Input, Form, FormActions } from '@styles/form';

import { useZonesState } from './useZonesState';

export const Create = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { add } = useZonesState();
  const { facilities } = useFacilitiesState();
  const { formData, handleInputChange } = useForm({
    facility: facilities[0].id,
    name: '',
    description: ''
  });

  const createZone = async () => {
    const { name, description, facility } = formData;
    if (!name || !description || !facility) {
      return;
    }

    await add({
      id: uuid(),
      name,
      description,
      facilityID: facility,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    history.push('/zones');
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

        <Form>
          <InputGroup>
            <h4>Facility</h4>
            <Input
              as='select'
              name='facility'
              value={formData.facility}
              onChange={handleInputChange}
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
            />
          </InputGroup>

          <InputGroup>
            <h4>Description</h4>
            <Input
              required
              as='textarea'
              name='description'
              css={{ minHeight: 96 }}
              value={formData.description}
              onChange={handleInputChange}
            />
          </InputGroup>

          <FormActions>
            <Button color='purple' onClick={createZone}>
              Save
            </Button>
          </FormActions>
        </Form>
      </PageContent>
    </>
  );
};
