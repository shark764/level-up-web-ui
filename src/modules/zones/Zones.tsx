import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '@modules/auth';
import {
  Pencil1Icon,
  TrashIcon,
  AlertDialog,
  PlusIcon,
  UserMenu
} from '@modules/common/components';
import { useFacilitiesState } from '@modules/facilities/useFacilitiesState';
import { Header, Title, SubTitle, PageContent } from '@styles/page';
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
  const history = useHistory();
  const { user } = useAuth();
  const { zones, delete: deleteZone } = useZonesState();
  const { get } = useFacilitiesState();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedZone, setSelectedZone] = useState('');

  return (
    <>
      <Header>
        <div>
          <Title>Zones</Title>
          <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
        </div>
        <UserMenu />
      </Header>
      <PageContent>
        <Table>
          <TableHead>
            <tr>
              <TableHeader>Facility</TableHeader>
              <TableHeader>Name</TableHeader>
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
            {zones.length > 0 &&
              zones.map((zone) => {
                const { id, name, facilityID, description } = zone;

                return (
                  <TableRow
                    key={id}
                    onClick={() => history.push(`/zones/${id}`)}
                  >
                    <TableData>{get(facilityID).name}</TableData>
                    <TableData>{name}</TableData>
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
