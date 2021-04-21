import React, { useState } from 'react';
import { Modal, Pencil1Icon } from '@modules/common/components';
import { useForm } from '@modules/common/hooks';
import { Facility } from '@modules/facilities/useFacilitiesState';
import {
  ModalFooter,
  CancelButton,
  SuccessButton,
  InputGroup,
  Input,
  Form
} from '@styles/form';
import { styled } from 'stitches.config';

const Header = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  padding: '$2 $3 $4',
  marginBottom: '$4',
  '& > h2': {
    margin: 0
  }
});

const EditButton = styled('button', {
  all: 'unset',
  padding: '$3',
  borderRadius: '$round',
  lineHeight: '16px',
  height: '16px',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#f95f9a'
  },

  '& > svg': {
    width: '16px',
    height: '16px',
    color: '$offWhite'
  }
});

interface Props {
  facility: Facility;
  isOpen: boolean;
  updateFacility: (facility: Facility, facilityId: string) => void;
  onClose: () => void;
}

export const Details = ({
  facility,
  updateFacility,
  isOpen,
  onClose
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const { formData, handleInputChange } = useForm({
    name: facility.name,
    phoneNumber: facility.phoneNumber,
    address: facility.address
  });

  return (
    <Modal label={facility.name} isOpen={isOpen} onClose={onClose}>
      <Header>
        <h2>{facility.name}</h2>
        <EditButton onClick={() => setIsEditing(!isEditing)}>
          <Pencil1Icon />
        </EditButton>
      </Header>
      <Form>
        <InputGroup>
          <label htmlFor='name'>Name: </label>
          <Input
            name='name'
            value={formData.name}
            disabled={!isEditing}
            onChange={handleInputChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor='phoneNumber'>Phone number: </label>
          <Input
            name='phoneNumber'
            value={formData.phoneNumber}
            disabled={!isEditing}
            onChange={handleInputChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor='address'>Address: </label>
          <Input
            name='address'
            value={formData.address}
            disabled={!isEditing}
            onChange={handleInputChange}
            required
          />
        </InputGroup>

        <ModalFooter>
          <CancelButton onClick={onClose}>
            {isEditing ? 'Cancel' : 'Close'}
          </CancelButton>
          {isEditing && (
            <SuccessButton
              onClick={() => {
                updateFacility(
                  {
                    id: facility.id,
                    name: formData.name,
                    address: formData.address,
                    phoneNumber: formData.phoneNumber
                  },
                  facility.id
                );
              }}
            >
              Update
            </SuccessButton>
          )}
        </ModalFooter>
      </Form>
    </Modal>
  );
};
