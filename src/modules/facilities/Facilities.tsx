import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '@modules/auth';
import {
  Pencil1Icon,
  TrashIcon,
  AlertDialog,
  UserMenu,
  PlusIcon,
  Filters
} from '@modules/common/components';
import {
  Table,
  TableBody,
  TableData,
  TableRow,
  TableHeader,
  TableHead,
  ActionButton
} from '@styles/table';
import { Button } from '@styles/button';
import {
  Header,
  Title,
  SubTitle,
  PageContent,
  FiltersContainer
} from '@styles/page';
import { useFacilitiesState } from './useFacilitiesState';

export const Facilities = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { facilities, delete: deleteFacility } = useFacilitiesState();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState('');
  const [filter, setFilter] = useState('');
  const [facilitiesFilter, setFacilitiesFilter] = useState(facilities);

  useEffect(() => {
    const filtered = facilities.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    setFacilitiesFilter(filtered);
  }, [facilities, filter]);

  return (
    <>
      <Header>
        <div>
          <Title>Facilities</Title>
          <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
        </div>
        <FiltersContainer>
          <Filters.Root
            content={
              <Filters.InputGroup>
                <label>Name</label>
                <Filters.Input
                  placeholder='Search Facility by Name...'
                  value={filter}
                  onChange={({ target: { value } }) => setFilter(value)}
                />
              </Filters.InputGroup>
            }
            onClear={() => {
              setFilter('');
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
              <TableHeader>Address</TableHeader>
              <TableHeader>Phone Number</TableHeader>
              <TableHeader
                css={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <Button
                  color='green'
                  onClick={() => history.push('/facilities/create')}
                >
                  New Facility <PlusIcon />
                </Button>
              </TableHeader>
            </tr>
          </TableHead>

          <TableBody>
            {facilitiesFilter.length > 0 &&
              facilitiesFilter.map((facility) => {
                const { id, name, address, phoneNumber } = facility;

                return (
                  <TableRow
                    key={id}
                    onClick={() => history.push(`/facilities/${id}`)}
                  >
                    <TableData>{name}</TableData>
                    <TableData
                      css={{
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        maxWidth: 320
                      }}
                    >
                      {address}
                    </TableData>
                    <TableData>{phoneNumber}</TableData>
                    <TableData css={{ textAlign: 'end' }}>
                      <ActionButton
                        onClick={(event) => {
                          event.stopPropagation();
                          history.push(`/facilities/${id}?action=edit`);
                        }}
                      >
                        <Pencil1Icon />
                      </ActionButton>
                      <ActionButton
                        color='danger'
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedFacility(id);
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
        title='Are you sure you want to delete this Facility'
        description='Once the data is deleted it cannot be recovered'
        color='danger'
        icon={<TrashIcon />}
        onCancel={() => {
          setShowDeleteDialog(false);
          setSelectedFacility('');
        }}
        onAccept={() => {
          setShowDeleteDialog(false);
          setSelectedFacility('');
          deleteFacility(selectedFacility);
        }}
      />
    </>
  );
};
