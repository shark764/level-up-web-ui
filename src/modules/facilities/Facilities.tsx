import React, { useState } from 'react';
import { PlusCircledIcon } from '@modules/common/components';
import {
  Table,
  TableBody,
  TableData,
  TableRow,
  TableHeader,
  TableHead
} from '@styles/table';
import { useFacilitiesState, Facility } from './useFacilitiesState';
import { Create, Details } from './components';
import { Header } from '@styles/text';
import { styled } from 'stitches.config';

const AddButton = styled('button', {
  all: 'unset',
  padding: '$3',
  borderRadius: '$round',
  lineHeight: '16px',
  height: '16px',
  backgroundColor: '$magenta',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#f95f9a'
  },

  '& > svg': {
    width: '16px',
    height: '16px'
  }
});

export const Facilities = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { facilities, update, add } = useFacilitiesState();
  const [selectedFacility, setSelectedFacility] = useState(
    null as Facility | null
  );

  return (
    <>
      <Header>
        <h1>Facilities</h1>
        <AddButton onClick={() => setIsAddOpen(true)}>
          <PlusCircledIcon />
        </AddButton>
      </Header>
      <Table>
        <TableHead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Address</TableHeader>
            <TableHeader>Phone Number</TableHeader>
          </tr>
        </TableHead>

        <TableBody>
          {/** Super nasty hack to separate thead and tbody */}
          <tr>
            <td style={{ height: 16 }} />
          </tr>
          {facilities.map((facility) => {
            const { id, name, address, phoneNumber } = facility;

            return (
              <TableRow
                key={id}
                onClick={() => {
                  setSelectedFacility(facility);
                  setIsDetailsOpen(true);
                }}
              >
                <TableData>{name}</TableData>
                <TableData>{address}</TableData>
                <TableData>{phoneNumber}</TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Create
        isOpen={isAddOpen}
        create={(facility) => {
          add(facility);
          setIsAddOpen(false);
        }}
        onClose={() => setIsAddOpen(false)}
      />
      {isDetailsOpen && selectedFacility && (
        <Details
          facility={selectedFacility}
          updateFacility={(facility, facilityId) => {
            update(facility, facilityId);
            setIsDetailsOpen(false);
            setSelectedFacility(null);
          }}
          isOpen={isDetailsOpen && !!selectedFacility}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedFacility(null);
          }}
        />
      )}
    </>
  );
};
