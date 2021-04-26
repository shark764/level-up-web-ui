import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '@modules/auth';
import { useForm } from '@modules/common/hooks';
import { uuid } from '@modules/common/utils';
import { ChevronLeftIcon, UserMenu } from '@modules/common/components';
import { Header, Title, SubTitle, PageContent, BackButton } from '@styles/page';
import { Button } from '@styles/button';
import { InputGroup, Input, Form, FormActions } from '@styles/form';
import { useFacilitiesState } from './useFacilitiesState';

export const Create = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { add } = useFacilitiesState();
  const { formData, handleInputChange } = useForm({
    name: '',
    phoneNumber: '',
    address: ''
  });

  const createFacility = async () => {
    const { name, phoneNumber, address } = formData;
    if (!name || !phoneNumber || !address) {
      return;
    }

    await add({
      id: uuid(),
      name,
      phoneNumber,
      address,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    history.push('/facilities');
  };

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

        <Form>
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
            <h4>Phone Number</h4>
            <Input
              required
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleInputChange}
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
            />
          </InputGroup>
          <FormActions>
            <Button color='purple' onClick={createFacility}>
              Save
            </Button>
          </FormActions>
        </Form>
      </PageContent>
    </>
  );
};
