import React, { useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useAuth } from '@modules/auth';
import { useZonesState } from '@modules/zones';
import { useForm, useQuery } from '@modules/common/hooks';
import {
  ChevronLeftIcon,
  UserMenu,
  TrashIcon,
  Pencil1Icon,
  AlertDialog,
  Switch
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
import { useDevicesState } from './useDevicesState';

export const Device = () => {
  const urlQuery = useQuery();
  const urlAction = urlQuery.get('action');

  const history = useHistory();
  const { id } = useParams() as { id: string };

  const { user } = useAuth();
  const { get, update, delete: deleteDevice } = useDevicesState();
  const { zones } = useZonesState();
  const device = get(id);
  const [disabled, setDisabled] = useState(device.status === 'Disabled');

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(urlAction === 'edit');
  const { formData, handleInputChange } = useForm({
    zone: device?.zoneID,
    code: device?.code,
    type: device?.type,
    softwareVersion: device?.softwareVersion
  });

  const updateDevice = () => {
    console.log('help', formData);
    const { code, type, zone, softwareVersion } = formData;
    if (!code || !type || !zone || !softwareVersion) {
      return;
    }

    update(
      {
        ...device,
        code,
        type,
        softwareVersion,
        status: disabled ? 'Disabled' : 'Online',
        updatedAt: Date.now()
      },
      id
    );

    setIsEditing(false);
  };

  if (!device) {
    return <Redirect to='/devices' />;
  }

  const createdDate = new Date(device.createdAt);
  const updatedDate = new Date(device.updatedAt);

  return (
    <>
      <Header>
        <div>
          <Title>Device Details</Title>
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

        <Form
          onSubmit={(e) => e.preventDefault()}
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
                disabled={!isEditing}
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
              disabled
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
              disabled={!isEditing}
            />
          </InputGroup>
          <InputGroup>
            <h4>Software Version</h4>
            <Input
              required
              name='softwareVersion'
              value={formData.softwareVersion}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </InputGroup>
          {isEditing && (
            <InputGroup>
              <h4>Disabled</h4>
              <Switch
                checked={disabled}
                onCheckedChange={() => setDisabled(!disabled)}
              />
            </InputGroup>
          )}
          <FormActions>
            {isEditing && (
              <Button color='purple' onClick={updateDevice}>
                Save
              </Button>
            )}
          </FormActions>
        </Form>
      </PageContent>
      <AlertDialog
        open={showDeleteDialog}
        title='Are you sure you want to delete this Device'
        description='Once the data is deleted it cannot be recovered'
        color='danger'
        icon={<TrashIcon />}
        onCancel={() => setShowDeleteDialog(false)}
        onAccept={async () => {
          setShowDeleteDialog(false);
          deleteDevice(id);
        }}
      />
    </>
  );
};
