import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '@modules/auth';
import { useZonesState } from '@modules/zones';
import { useForm } from '@modules/common/hooks';
import { uuid } from '@modules/common/utils';
import { ChevronLeftIcon, UserMenu } from '@modules/common/components';
import { Header, Title, SubTitle, PageContent, BackButton } from '@styles/page';
import { Button } from '@styles/button';
import { InputGroup, Input, Form, FormActions } from '@styles/form';
import { useDevicesState } from './useDevicesState';

export const Create = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { add } = useDevicesState();
  const { zones } = useZonesState();
  const { formData, handleInputChange } = useForm({
    zone: zones[0]?.id,
    code: '',
    type: '',
    softwareVersion: ''
  });

  const createDevice = async () => {
    const { code, type, zone, softwareVersion } = formData;
    if (!code || !type || !zone || !softwareVersion) {
      return;
    }

    await add({
      id: uuid(),
      zoneID: zone,
      code,
      type,
      softwareVersion,
      status: 'Online',
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    history.push('/devices');
  };

  return (
    <>
      <Header>
        <div>
          <Title>Device Creation</Title>
          <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
        </div>
        <UserMenu />
      </Header>
      <PageContent>
        <BackButton onClick={() => history.goBack()}>
          <ChevronLeftIcon />
          Back
        </BackButton>
        <Form
          css={{
            [`& ${InputGroup}:nth-last-child(2)`]: {
              flexBasis: 'calc(50% - 16px)'
            }
          }}
        >
          <InputGroup>
            <InputGroup>
              <h4>Code</h4>
              <Input
                required
                name='code'
                value={formData.code}
                onChange={handleInputChange}
              />
            </InputGroup>
          </InputGroup>
          <InputGroup>
            <h4>Zone</h4>
            <Input
              as='select'
              name='zone'
              css={{ appearance: 'searchfield' }}
              value={formData.zone}
              onChange={handleInputChange}
            >
              {zones.length > 0 &&
                zones.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
            </Input>
          </InputGroup>
          <InputGroup>
            <h4>Type</h4>
            <Input
              required
              name='type'
              value={formData.type}
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup>
            <h4>Software Version</h4>
            <Input
              required
              name='softwareVersion'
              value={formData.softwareVersion}
              onChange={handleInputChange}
            />
          </InputGroup>
          <FormActions>
            <Button color='purple' onClick={createDevice}>
              Save
            </Button>
          </FormActions>
        </Form>
      </PageContent>
    </>
  );
};
