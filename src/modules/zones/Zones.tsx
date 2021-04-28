import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '@modules/auth';
import { useFacilitiesState } from '@modules/facilities';
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
import { useZonesState } from './useZonesState';

export const Zones = () => {
  const urlQuery = useQuery();
  const facility = urlQuery.get('facility');
  const history = useHistory();
  const { user } = useAuth();
  const { zones, delete: deleteZone } = useZonesState();
  const { get, facilities } = useFacilitiesState();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedZone, setSelectedZone] = useState('');

  const [filter, setFilter] = useState('');
  const [facilityFilter, setFacilityFilter] = useState(
    facility ? facility : ''
  );
  const [zonesFilter, setZonesFilter] = useState(zones);

  useEffect(() => {
    const facilityFiltered = facilityFilter
      ? zones.filter(({ facilityID }) => facilityID === facilityFilter)
      : zones;

    const filtered = facilityFiltered.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );

    setZonesFilter(filtered);
  }, [zones, filter, facilityFilter]);

  return (
    <>
      <Header>
        <div>
          <Title>Zones</Title>
          <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
        </div>
        <FiltersContainer>
          <Filters.Root
            content={
              <>
                <Filters.InputGroup>
                  <label>Name</label>
                  <Filters.Input
                    placeholder='Search Zone by Name...'
                    value={filter}
                    onChange={({ target: { value } }) => setFilter(value)}
                  />
                </Filters.InputGroup>
                <Filters.InputGroup>
                  <label>Facility</label>
                  <Filters.Input
                    as='select'
                    css={{ appearance: 'searchfield' }}
                    value={facilityFilter}
                    onChange={({ target: { value } }) => {
                      history.push({
                        pathname: '/zones',
                        search: `?facility=${value}`
                      });
                      setFacilityFilter(value);
                    }}
                  >
                    <option value='' disabled>
                      Search Zones by Facility
                    </option>
                    {facilities.length > 0 &&
                      facilities.map(({ id, name }) => (
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
              setFacilityFilter('');
              history.push({
                pathname: '/zones'
              });
            }}
          />
        </FiltersContainer>
        <UserMenu />
      </Header>
      <PageContent>
        <Table>
          <TableHead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Facility</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader
                css={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <Button
                  color='green'
                  onClick={() => history.push('/zones/create')}
                >
                  New Zone <PlusIcon />
                </Button>
              </TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            {zonesFilter.length > 0 &&
              zonesFilter.map((zone) => {
                const { id, name, facilityID, description } = zone;

                return (
                  <TableRow
                    key={id}
                    onClick={() => history.push(`/zones/${id}`)}
                  >
                    <TableData>{name}</TableData>
                    <TableData>
                      {get(facilityID)?.name ?? 'Not available'}
                    </TableData>
                    <TableData
                      css={{
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        maxWidth: 320
                      }}
                    >
                      {description}
                    </TableData>
                    <TableData css={{ textAlign: 'end' }}>
                      <ActionButton
                        onClick={(event) => {
                          event.stopPropagation();
                          history.push(`/zones/${id}?action=edit`);
                        }}
                      >
                        <Pencil1Icon />
                      </ActionButton>
                      <ActionButton
                        color='danger'
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedZone(id);
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
        title='Are you sure you want to delete this Zone'
        description='Once the data is deleted it cannot be recovered'
        color='danger'
        icon={<TrashIcon />}
        onCancel={() => {
          setShowDeleteDialog(false);
          setSelectedZone('');
        }}
        onAccept={() => {
          setShowDeleteDialog(false);
          setSelectedZone('');
          deleteZone(selectedZone);
        }}
      />
    </>
  );
};
