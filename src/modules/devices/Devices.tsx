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
  FiltersContainer
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
import { useDevicesState } from './useDevicesState';

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
  const [zoneFilter, setZoneFilter] = useState(zone ? zone : '');
  const [devicesFilter, setDevicesFilter] = useState(devices);

  useEffect(() => {
    const zonesFiltered = zoneFilter
      ? devices.filter(({ zoneID }) => zoneID === zoneFilter)
      : devices;

    const filtered = zonesFiltered.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );

    setDevicesFilter(filtered);
  }, [devices, filter, zoneFilter]);

  return (
    <>
      <Header>
        <div>
          <Title>Devices</Title>
          <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
        </div>
        {/*  <FiltersContainer>
          <Filters.Root
            content={
              <>
                <Filters.InputGroup>
                  <label>Name</label>
                  <Filters.Input
                    placeholder='Search Devices by Name...'
                    value={filter}
                    onChange={({ target: { value } }) => setFilter(value)}
                  />
                </Filters.InputGroup>
                <Filters.InputGroup>
                  <label>Zone</label>
                  <Filters.Input
                    as='select'
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
            }}
          />
        </FiltersContainer>
         */}
        <UserMenu />
      </Header>
      <PageContent>
        <Table>
          <TableHead>
            <tr>
              <TableHeader>Zone</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Code</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Software Version</TableHeader>
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
                const {
                  id,
                  name,
                  zoneID,
                  code,
                  type,
                  softwareVersion
                } = device;

                return (
                  <TableRow
                    key={id}
                    onClick={() => history.push(`/devices/${id}`)}
                  >
                    <TableData>
                      {get(zoneID)?.name ?? 'Not available'}
                    </TableData>
                    <TableData>{name}</TableData>
                    <TableData>{code}</TableData>
                    <TableData>{type}</TableData>
                    <TableData>{softwareVersion}</TableData>
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
                          // setShowDeleteDialog(true);
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
