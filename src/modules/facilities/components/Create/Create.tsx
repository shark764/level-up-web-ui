import React from 'react';
import { Modal } from '@modules/common/components';
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

interface Props {
  isOpen: boolean;
  create: (facility: Facility) => void;
  onClose: () => void;
}

export const Create = ({ isOpen, create, onClose }: Props) => {
  const { formData, handleInputChange } = useForm({
    name: '',
    phoneNumber: '',
    address: ''
  });
  return (
    <Modal label='Create new facility' isOpen={isOpen} onClose={onClose}>
      <Header>
        <h2>Create new facility</h2>
      </Header>
      <Form>
        <InputGroup>
          <label htmlFor='name'>Name: </label>
          <Input
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor='phoneNumber'>Phone number: </label>
          <Input
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor='address'>Address: </label>
          <Input
            name='address'
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </InputGroup>

        <ModalFooter>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <SuccessButton
            onClick={() => {
              create({
                id: Date.now().toString(),
                name: formData.name,
                address: formData.address,
                phoneNumber: formData.phoneNumber
              });
            }}
          >
            Create Facility
          </SuccessButton>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
