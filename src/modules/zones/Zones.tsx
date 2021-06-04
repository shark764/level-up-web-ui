import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
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
  FiltersContainer,
  EmptyImage,
  EmptyTitle
} from '@styles/page';
import { Button } from '@styles/button';
import { Table, TableBody, TableRow, ActionButton } from '@styles/table';
import { styled } from 'stitches.config';
import { ZonePreview } from './ZonePreview';
import { useZonesState } from './useZonesState';

const Actions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginBottom: '$3'
});

const TableData = styled('td', {
  padding: '$2 0',
  borderRadius: '$1'
});

const ZoneInfo = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 $4 $2',

  '& *': { margin: 0, lineHeight: '$2' },
  '& h3': { color: '$offWhite' },
  color: '$mediumGray'
});

export const Zones = () => {
  const urlQuery = useQuery();
  const facility = urlQuery.get('facility');
  const history = useHistory();
  const { user } = useAuth();
  const { zones, delete: deleteZone } = useZonesState();
  const { get: getFacility, facilities } = useFacilitiesState();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedZone, setSelectedZone] = useState('');

  const [filter, setFilter] = useState('');
  const [facilityFilter, setFacilityFilter] = useState(facility || '');
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

  const getFilters = () => (
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
                  facilities.map(({ id, facilityName }) => (
                    <option key={id} value={id}>
                      {facilityName}
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
  );

  if (!zonesFilter || zonesFilter.length === 0) {
    return (
      <>
        <Header>
          <div>
            <Title>Zones</Title>
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
            Oops! There are no zones {facilityFilter ? 'in this facility' : ''}{' '}
            yet!
          </EmptyTitle>
          <EmptyImage src='/assets/img/new_entry.svg' />

          <Button color='green' onClick={() => history.push('/zones/create')}>
            New Zone <PlusIcon />
          </Button>
        </PageContent>
      </>
    );
  }

  return (
    <>
      <Header>
        <div>
          <Title>Zones</Title>
          <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
        </div>
        {getFilters()}
        <UserMenu />
      </Header>
      <PageContent>
        <Actions>
          <Button
            // @ts-ignore
            as={Link}
            color='green'
            to='/zones/create'
            css={{ alignSelf: 'flex-end' }}
          >
            New Zone <PlusIcon />
          </Button>
        </Actions>

        <Table>
          <TableBody>
            {zonesFilter.length > 0 &&
              zonesFilter.map((zone) => {
                const { id, name, facilityID, diagram, diagramImg } = zone;

                const zoneFacility = getFacility(facilityID);
                const facilityName = zoneFacility?.facilityName ?? '[Deleted]';

                const size = `${zone.columns} x ${zone.rows} mts.`;
                const lanes = diagram
                  ? diagram.filter((z) => z.type === 'lane').length
                  : 0;
                const displays = diagram
                  ? diagram.filter((z) => z.type === 'display').length
                  : 0;
                const devices = diagram
                  ? diagram.filter((z) => z.type === 'target').length
                  : 0;

                return (
                  <TableRow
                    key={id}
                    onClick={() => {
                      setSelectedZone(selectedZone === id ? '' : id);
                    }}
                  >
                    <TableData>
                      <ZoneInfo>
                        <div>
                          <h3>{name}</h3>
                          <p>{facilityName}</p>
                          <p>{size}</p>
                        </div>
                        <div>
                          <ActionButton
                            css={{ padding: '$3' }}
                            onClick={(event) => {
                              event.stopPropagation();
                              history.push(`/zones/${id}`);
                            }}
                          >
                            <Pencil1Icon />
                          </ActionButton>
                          <ActionButton
                            css={{ padding: '$3' }}
                            color='danger'
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedZone(id);
                              setShowDeleteDialog(true);
                            }}
                          >
                            <TrashIcon />
                          </ActionButton>
                        </div>
                      </ZoneInfo>
                      {selectedZone === id && (
                        <div>
                          <ZonePreview
                            zone={{
                              name,
                              facilityName,
                              size,
                              lanes,
                              devices,
                              displays
                            }}
                            previewImg={diagramImg}
                          />
                        </div>
                      )}
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
