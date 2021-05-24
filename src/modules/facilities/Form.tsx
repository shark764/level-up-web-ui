import * as React from 'react';
import { countries, states } from '@modules/common/utils';
import { Button } from '@styles/button';
import {
  InputGroup,
  Input,
  Form,
  FormActions,
  Select,
  Checkbox
} from '@styles/form';

export const FacilityForm = ({
  formData,
  handleInputChange,
  isEditing = false,
  isDisabled = false,
  onFormSave
}: {
  formData: any;
  handleInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void;
  isEditing: boolean;
  isDisabled: boolean;
  onFormSave(e: React.SyntheticEvent): void;
}) => {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <InputGroup>
        <h4>Name</h4>
        <Input
          required
          name='facilityName'
          value={formData.facilityName}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Phone Number</h4>
        <Input
          required
          name='primaryPhoneNumber'
          value={formData.primaryPhoneNumber}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Secondary Phone Number</h4>
        <Input
          required
          name='secondaryPhoneNumber'
          value={formData.secondaryPhoneNumber}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Address</h4>
        <Input
          required
          as='textarea'
          name='address'
          css={{ minHeight: 96 }}
          value={formData.address}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>City</h4>
        <Input
          required
          name='city'
          value={formData.city}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>State</h4>
        <Select
          required
          name='state'
          value={formData.state}
          onChange={handleInputChange}
          disabled={isDisabled}
        >
          {states.map((state) => {
            return (
              <option value={state.code} key={state.code}>
                {state.name}
              </option>
            );
          })}
        </Select>
      </InputGroup>

      <InputGroup>
        <h4>ZIP</h4>
        <Input
          required
          name='zip'
          value={formData.zip}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Country</h4>
        <Select
          required
          name='country'
          value={formData.country}
          onChange={handleInputChange}
          disabled={isDisabled}
        >
          {countries.map((country) => {
            return (
              <option value={country.code} key={country.code}>
                {country.name}
              </option>
            );
          })}
        </Select>
      </InputGroup>

      <InputGroup>
        <h4>Website Url</h4>
        <Input
          required
          name='facilityWebsiteUrl'
          value={formData.facilityWebsiteUrl}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Type</h4>
        <Input
          required
          name='facilityType'
          value={formData.facilityType}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Size</h4>
        <Input
          required
          name='facilitySize'
          type='number'
          value={formData.facilitySize}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Building Size</h4>
        <Input
          required
          name='facilityBuildingSize'
          type='number'
          value={formData.facilityBuildingSize}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Number of Zones</h4>
        <Input
          required
          name='numberOfZones'
          type='number'
          value={formData.numberOfZones}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Social Media</h4>
        <Input
          required
          name='socialMedia'
          value={formData.socialMedia}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Social Media Url</h4>
        <Input
          required
          name='socialMediaUrl'
          value={formData.socialMediaUrl}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Administrator</h4>
        <Input
          required
          name='facilityAdministratorName'
          value={formData.facilityAdministratorName}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Administrator Phone</h4>
        <Input
          required
          name='facilityAdministratorPhone'
          value={formData.facilityAdministratorPhone}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Administrator Email</h4>
        <Input
          required
          name='facilityAdministratorEmail'
          value={formData.facilityAdministratorEmail}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Hours Of Operation</h4>
        <Input
          required
          name='hoursOfOperation'
          value={formData.hoursOfOperation}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Payment Information</h4>
        <Input
          required
          name='paymentInformation'
          value={formData.paymentInformation}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>NSSF Member</h4>
        <Checkbox
          required
          name='nssfMember'
          type='checkbox'
          checked={formData.nssfMember}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>NSSF Rating</h4>
        <Input
          required
          name='nssfRating'
          type='number'
          value={formData.nssfRating}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Range IoT Enabled</h4>
        <Checkbox
          required
          name='rangeIoTEnabled'
          type='checkbox'
          checked={formData.rangeIoTEnabled}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Services</h4>
        <Input
          required
          name='facilityServices'
          value={formData.facilityServices}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Category</h4>
        <Input
          required
          name='category'
          value={formData.category}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Subcategory</h4>
        <Input
          required
          name='subcategory'
          value={formData.subcategory}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup>
        <h4>Secuence</h4>
        <Input
          required
          name='secuence'
          type='number'
          value={formData.secuence}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </InputGroup>

      <FormActions>
        <Button color='purple' onClick={onFormSave}>
          Save
        </Button>
      </FormActions>
    </Form>
  );
};
