/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '@modules/auth';
import {
  Pencil1Icon,
  TrashIcon,
  AlertDialog,
  UserMenu
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
import { Header, Title, SubTitle, PageContent } from '@styles/page';
import { useFacilitiesState } from './useFacilitiesState';
import { styled } from 'stitches.config';

const CreateButton = styled('button', {
  all: 'unset',
  padding: '$2 $3',
  borderRadius: '$1',
  backgroundColor: '$brightGreen',
  color: '$charcoalMedium'
});

export const Facilities = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { facilities, delete: deleteFacility } = useFacilitiesState();
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState('');

  return (
    <>
      <Header>
        <div>
          <Title>Facilities</Title>
          <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
        </div>
        <UserMenu />
      </Header>

      <PageContent>
        <Table>
          <TableHead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Address</TableHeader>
              <TableHeader>Phone Number</TableHeader>
              <TableHeader css={{ textAlign: 'end' }}>
                <CreateButton css={{ cursor: 'not-allowed' }}>
                  New Facility
                </CreateButton>
              </TableHeader>
            </tr>
          </TableHead>

          <TableBody>
            {facilities.map((facility) => {
              const { id, name, address, phoneNumber } = facility;

              return (
                <TableRow
                  key={id}
                  onClick={() => history.push(`/facilities/${id}`)}
                >
                  <TableData>{name}</TableData>
                  <TableData>{address}</TableData>
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
                        setShowCloseDialog(true);
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
        open={showCloseDialog}
        title='Are you sure you want to delete this Facility'
        description='Once the data is deleted it cannot be recovered'
        color='danger'
        icon={<TrashIcon />}
        onCancel={() => {
          setShowCloseDialog(false);
          setSelectedFacility('');
        }}
        onAccept={() => {
          setShowCloseDialog(false);
          setSelectedFacility('');
          deleteFacility(selectedFacility);
        }}
      />
    </>
  );
};
