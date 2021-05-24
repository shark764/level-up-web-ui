import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '@modules/auth';
import { useZonesState } from '@modules/zones';
import { useQuery } from '@modules/common/hooks';
import {
  Pencil1Icon,
  TrashIcon,
  AlertDialog,
  PlusIcon,
  UserMenu,
  Filters
} from '@modules/common/components';
import {
  Header,
  Title,
  SubTitle,
  PageContent,
  FiltersContainer,
  EmptyImage,
  EmptyTitle
} from '@styles/page';
import { Button } from '@styles/button';
import {
  Table,
  TableBody,
  TableData,
  TableRow,
  TableHeader,
  TableHead,
  ActionButton
} from '@styles/table';
import { styled } from 'stitches.config';
import { useDevicesState } from './useDevicesState';

const OnlineStatus = styled('div', {
  width: 12,
  height: 12,
  borderRadius: '$round',
  backgroundColor: '$mediumGray',
  variants: {
    color: {
      online: {
        backgroundColor: '$success'
      },
      disabled: {
        backgroundColor: '$error'
      }
    }
  }
});

export const Devices = () => {
  const urlQuery = useQuery();
  const zone = urlQuery.get('zone');
  const history = useHistory();

  const { user } = useAuth();
  const { devices, delete: deleteDevice } = useDevicesState();
  const { get, zones } = useZonesState();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('');

  const [filter, setFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [zoneFilter, setZoneFilter] = useState(zone || '');
  const [devicesFilter, setDevicesFilter] = useState(devices);

  useEffect(() => {
    const zonesFiltered = zoneFilter
      ? devices.filter(({ zoneID }) => zoneID === zoneFilter)
      : devices;

    const filtered = zonesFiltered.filter(
      ({ code, type }) =>
        code.toLowerCase().includes(filter.toLowerCase()) &&
        type.toLowerCase().includes(typeFilter.toLowerCase())
    );

    setDevicesFilter(filtered);
  }, [devices, filter, zoneFilter, typeFilter]);

  const getFilters = () => (
    <FiltersContainer>
      <Filters.Root
        content={
          <>
            <Filters.InputGroup>
              <label>Code</label>
              <Filters.Input
                placeholder='Search Devices by Code...'
                value={filter}
                onChange={({ target: { value } }) => setFilter(value)}
              />
            </Filters.InputGroup>
            <Filters.InputGroup>
              <label>Type</label>
              <Filters.Input
                placeholder='Search Devices by Type...'
                value={typeFilter}
                onChange={({ target: { value } }) => setTypeFilter(value)}
              />
            </Filters.InputGroup>
            <Filters.InputGroup>
              <label>Zone</label>
              <Filters.Input
                as='select'
                css={{ appearance: 'searchfield' }}
                value={zoneFilter}
                onChange={({ target: { value } }) => {
                  history.push({
                    pathname: '/devices',
                    search: `?zone=${value}`
                  });
                  setZoneFilter(value);
                }}
              >
                <option value='' disabled>
                  Search Devices by Zone
                </option>
                {zones.length > 0 &&
                  zones.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
              </Filters.Input>
            </Filters.InputGroup>
          </>
        }
        onClear={() => {
          setFilter('');
          setZoneFilter('');
          history.push({
            pathname: '/devices'
          });
        }}
      />
    </FiltersContainer>
  );

  if (!devicesFilter || devicesFilter.length === 0) {
    return (
      <>
        <Header>
          <div>
            <Title>Devices</Title>
            <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
          </div>
          {getFilters()}
          <UserMenu />
        </Header>
        <PageContent
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '$3'
          }}
        >
          <EmptyTitle>
            Oops! There are no devices {zoneFilter ? 'in this zone' : ''} yet!
          </EmptyTitle>
          <EmptyImage src='/assets/img/new_entry.svg' />

          <Button color='green' onClick={() => history.push('/devices/create')}>
            New Device <PlusIcon />
          </Button>
        </PageContent>
      </>
    );
  }

  return (
    <>
      <Header>
        <div>
          <Title>Devices</Title>
          <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
        </div>
        {getFilters()}
        <UserMenu />
      </Header>
      <PageContent>
        <Table>
          <TableHead>
            <tr>
              <TableHeader>Code</TableHeader>
              <TableHeader>Zone</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader
                css={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <Button
                  color='green'
                  onClick={() => history.push('/devices/create')}
                >
                  New Device <PlusIcon />
                </Button>
              </TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            {devicesFilter.length > 0 &&
              devicesFilter.map((device) => {
                const { id, zoneID, code, type, status } = device;

                return (
                  <TableRow
                    key={id}
                    onClick={() => history.push(`/devices/${id}`)}
                  >
                    <TableData>{code}</TableData>
                    <TableData>
                      {get(zoneID)?.name ?? 'Not available'}
                    </TableData>

                    <TableData>{type}</TableData>
                    <TableData
                      css={{
                        display: 'flex',
                        gap: '$1',
                        alignItems: 'center'
                      }}
                    >
                      <OnlineStatus
                        color={status === 'Disabled' ? 'disabled' : 'online'}
                      />
                      {status}
                    </TableData>
                    <TableData css={{ textAlign: 'end' }}>
                      <ActionButton
                        onClick={(event) => {
                          event.stopPropagation();
                          history.push(`/devices/${id}?action=edit`);
                        }}
                      >
                        <Pencil1Icon />
                      </ActionButton>
                      <ActionButton
                        color='danger'
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedDevice(id);
                          setShowDeleteDialog(true);
                        }}
                      >
                        <TrashIcon />
                      </ActionButton>
                    </TableData>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </PageContent>
      <AlertDialog
        open={showDeleteDialog}
        title='Are you sure you want to delete this Device'
        description='Once the data is deleted it cannot be recovered'
        color='danger'
        icon={<TrashIcon />}
        onCancel={() => {
          setShowDeleteDialog(false);
          setSelectedDevice('');
        }}
        onAccept={() => {
          setShowDeleteDialog(false);
          setSelectedDevice('');
          deleteDevice(selectedDevice);
        }}
      />
    </>
  );
};
