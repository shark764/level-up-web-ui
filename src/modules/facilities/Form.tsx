import * as React from 'react';
import { facilitySocialMedias, timeHoursAmPm } from '@modules/common/utils';
import { Button } from '@styles/button';
import {
  Input,
  FormActions,
  Select,
  SwitchField,
  SwitchFieldInput,
  SwitchFieldLabel
} from '@styles/form';
import { styled } from 'stitches.config';
import { PlusIcon } from '@modules/common/components';
import { ReactSelect } from '@modules/common/components/ReactSelect';
import { FacilitySocialMedia } from './useFacilitiesState';

const FieldGroup = styled('div', {
  paddingTop: '$4',
  paddingBottom: '$4',
  borderBottom: '1px solid $charcoalMedium'
});
const FieldGroupTitle = styled('h3', {
  fontWeight: 700,
  fontStyle: 'normal',
  fontSize: '$heading3',
  lineHeight: '$1',
  color: '$mediumGray'
});
const FormRow = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$4',
  marginTop: '$4',
  marginBottom: '$4'
});
const FormColumn = styled('div', {
  flexGrow: 1,
  flex: 1,
  [`& ${Input}, ${Select}`]: {
    width: '-webkit-fill-available'
  }
});
const FormLabel = styled('span', {
  display: 'block',
  fontSize: '$bodyNormal',
  fontWeight: 400,
  lineHeight: '$3',
  color: '$mediumGray',
  fontStyle: 'normal'
});
const LabelSmall = styled('span', {
  fontSize: '$bodyXSmall'
});
const CheckListLabel = styled('label', {
  marginLeft: '$1',
  fontSize: '$bodyNormal',
  color: '$offWhite',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '$3'
});
const CheckListItem = styled('input', {
  [`&:checked + ${CheckListLabel}`]: {
    color: '$brightGreen'
  }
});
const ButtonsGroup = styled(FormActions, {
  display: 'flex',
  gap: 15
});

const timeHoursAmPmOptions = timeHoursAmPm.map((item) => ({
  value: item,
  label: item
}));
const facilitySocialMediasOptions = facilitySocialMedias.map((item) => ({
  value: item,
  label: item
}));
const getSelectedOption = (list: string, value: string) => {
  if (list === 'timeHour') {
    return timeHoursAmPmOptions.find((tHour) => tHour.value === value);
  }
  return facilitySocialMediasOptions.find((sMedia) => sMedia.value === value);
};

const RSStyleOptions = {
  singleValue: (provided: any, state: any) => ({
    ...provided,
    opacity: state.isDisabled ? 0.5 : 1,
    transition: 'opacity 300ms',
    fontSize: 14,
    color: '#5D5F83'
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: 14,
    color: state.isSelected ? '#393B60' : '#5D5F83',
    backgroundColor: state.isSelected ? '#C6D6EE' : '#F5F9FF',
    padding: 20,
    border: 'none',
    '&:hover': {
      backgroundColor: '#14162B',
      color: '#F5F9FF'
    }
  })
};

export const FacilityForm = ({
  formData,
  handleInputChange,
  isEditing = false,
  isDisabled = false,
  onFormSave,
  onDelete
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
  onDelete?(e: React.SyntheticEvent): void;
}) => {
  const [socialNetworks, setSocialNetworks] = React.useState(
    formData.socialMedia
  );
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FieldGroup>
        <FieldGroupTitle>Facility Details</FieldGroupTitle>
        <FormRow>
          <FormColumn>
            <FormLabel>Name*</FormLabel>
            <Input
              required
              name='facilityName'
              value={formData.facilityName}
              onChange={handleInputChange}
              disabled={isDisabled}
            />
          </FormColumn>

          <FormColumn>
            <FormLabel>Facility Website Url</FormLabel>
            <Input
              name='facilityWebsiteUrl'
              value={formData.facilityWebsiteUrl}
              onChange={handleInputChange}
              disabled={isDisabled}
            />
          </FormColumn>
        </FormRow>

        <FormRow>
          <FormColumn>
            <FormLabel>Primary Phone Number*</FormLabel>
            <Input
              required
              name='primaryPhoneNumber'
              value={formData.primaryPhoneNumber}
              onChange={handleInputChange}
              disabled={isDisabled}
            />
          </FormColumn>

          <FormColumn>
            <FormLabel>Secondary Phone Number</FormLabel>
            <Input
              name='secondaryPhoneNumber'
              value={formData.secondaryPhoneNumber}
              onChange={handleInputChange}
              disabled={isDisabled}
            />
          </FormColumn>

          <FormColumn>
            <FormLabel>Type*</FormLabel>
            <SwitchField>
              <SwitchFieldInput
                type='radio'
                name='facilityType'
                value='Indoor'
                checked={formData.facilityType === 'Indoor'}
                onChange={handleInputChange}
                id='facilityType-Indoor'
              />
              <SwitchFieldLabel htmlFor='facilityType-Indoor'>
                Indoor
              </SwitchFieldLabel>
              <SwitchFieldInput
                type='radio'
                name='facilityType'
                value='Outdoor'
                checked={formData.facilityType === 'Outdoor'}
                onChange={handleInputChange}
                id='facilityType-Outdoor'
              />
              <SwitchFieldLabel htmlFor='facilityType-Outdoor'>
                Outdoor
              </SwitchFieldLabel>
              <SwitchFieldInput
                type='radio'
                name='facilityType'
                value='Both'
                checked={formData.facilityType === 'Both'}
                onChange={handleInputChange}
                id='facilityType-Both'
              />
              <SwitchFieldLabel htmlFor='facilityType-Both'>
                Both
              </SwitchFieldLabel>
            </SwitchField>
          </FormColumn>
        </FormRow>

        <FormRow>
          <FormColumn>
            <FormLabel>Address*</FormLabel>
            <Input
              required
              as='textarea'
              name='address'
              value={formData.address}
              onChange={handleInputChange}
              disabled={isDisabled}
            />
          </FormColumn>
        </FormRow>

        <FormRow>
          <FormColumn css={{ maxWidth: '15%' }}>
            <FormLabel>Opening Time*</FormLabel>
            <ReactSelect
              name='hoursOfOperation.opening'
              disabled={isDisabled}
              styles={{ ...RSStyleOptions }}
              options={timeHoursAmPmOptions}
              width='100%'
              defaultValue={getSelectedOption(
                'timeHour',
                formData.hoursOfOperation.opening
              )}
            />
          </FormColumn>

          <FormColumn css={{ maxWidth: '15%' }}>
            <FormLabel>Closing Time*</FormLabel>
            <ReactSelect
              name='hoursOfOperation.closing'
              disabled={isDisabled}
              styles={{ ...RSStyleOptions }}
              options={timeHoursAmPmOptions}
              width='100%'
              defaultValue={getSelectedOption(
                'timeHour',
                formData.hoursOfOperation.closing
              )}
            />
          </FormColumn>

          <FormColumn>
            <FormLabel>NSSF Member</FormLabel>
            <SwitchField>
              <SwitchFieldInput
                type='radio'
                name='nssfMember'
                value='true'
                checked={!!formData.nssfMember}
                onChange={handleInputChange}
                id='nssfMember-True'
              />
              <SwitchFieldLabel htmlFor='nssfMember-True'>
                True
              </SwitchFieldLabel>
              <SwitchFieldInput
                type='radio'
                name='nssfMember'
                value='false'
                checked={!!formData.nssfMember === false}
                onChange={handleInputChange}
                id='nssfMember-Talse'
              />
              <SwitchFieldLabel htmlFor='nssfMember-Talse'>
                False
              </SwitchFieldLabel>
            </SwitchField>
          </FormColumn>

          <FormColumn>
            <FormLabel>
              Rating <LabelSmall>( From 0 to 5 )</LabelSmall>
            </FormLabel>
            <Input
              required
              name='nssfRating'
              type='number'
              value={formData.nssfRating}
              onChange={handleInputChange}
              disabled={isDisabled}
            />
          </FormColumn>
        </FormRow>
      </FieldGroup>

      <FieldGroup>
        <FieldGroupTitle>Facility Administrator</FieldGroupTitle>

        <FormRow>
          <FormColumn>
            <FormLabel>Name*</FormLabel>
            <Input
              required
              name='facilityAdministratorName'
              value={formData.facilityAdministratorName}
              onChange={handleInputChange}
              disabled={isDisabled}
            />
          </FormColumn>

          <FormColumn>
            <FormLabel>Phone*</FormLabel>
            <Input
              required
              name='facilityAdministratorPhone'
              value={formData.facilityAdministratorPhone}
              onChange={handleInputChange}
              disabled={isDisabled}
            />
          </FormColumn>

          <FormColumn>
            <FormLabel>Email*</FormLabel>
            <Input
              required
              name='facilityAdministratorEmail'
              value={formData.facilityAdministratorEmail}
              onChange={handleInputChange}
              disabled={isDisabled}
            />
          </FormColumn>
        </FormRow>
      </FieldGroup>

      <FieldGroup>
        <FieldGroupTitle>Facility Services</FieldGroupTitle>
        <FormRow css={{ maxWidth: '50%' }}>
          <FormColumn>
            <div>
              <CheckListItem
                type='checkbox'
                id='rangeIoTEnabled'
                name='rangeIoTEnabled'
                title='Range IoT Enabled'
                checked={formData.rangeIoTEnabled}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <CheckListLabel htmlFor='rangeIoTEnabled'>
                Range IoT Enabled
              </CheckListLabel>
            </div>
            <div>
              <CheckListItem
                type='checkbox'
                id='rangeMembership'
                name='rangeMembership'
                title='Range Membership'
                checked={formData.rangeMembership}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <CheckListLabel htmlFor='rangeMembership'>
                Range Membership
              </CheckListLabel>
            </div>
            <div>
              <CheckListItem
                type='checkbox'
                id='walkInRangeUsers'
                name='walkInRangeUsers'
                title='Walk-In Range Users'
                checked={formData.walkInRangeUsers}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <CheckListLabel htmlFor='walkInRangeUsers'>
                Walk-In Range Users
              </CheckListLabel>
            </div>
            <div>
              <CheckListItem
                type='checkbox'
                id='firearmsRentals'
                name='firearmsRentals'
                title='Firearms Rentals'
                checked={formData.firearmsRentals}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <CheckListLabel htmlFor='firearmsRentals'>
                Firearms Rentals
              </CheckListLabel>
            </div>
          </FormColumn>
          <FormColumn>
            <div>
              <CheckListItem
                type='checkbox'
                id='retailSales'
                name='retailSales'
                title='Retail Sales'
                checked={formData.retailSales}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <CheckListLabel htmlFor='retailSales'>
                Retail Sales
              </CheckListLabel>
            </div>
            <div>
              <CheckListItem
                type='checkbox'
                id='cafeteria'
                name='cafeteria'
                title='Cafeteria'
                checked={formData.cafeteria}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <CheckListLabel htmlFor='cafeteria'>Cafeteria</CheckListLabel>
            </div>
            <div>
              <CheckListItem
                type='checkbox'
                id='trainingClasses'
                name='trainingClasses'
                title='Training Classes'
                checked={formData.trainingClasses}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <CheckListLabel htmlFor='trainingClasses'>
                Training Classes
              </CheckListLabel>
            </div>
            <div>
              <CheckListItem
                type='checkbox'
                id='events'
                name='events'
                title='Events'
                checked={formData.events}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <CheckListLabel htmlFor='events'>Events</CheckListLabel>
            </div>
          </FormColumn>
          <FormColumn>
            <div>
              <CheckListItem
                type='checkbox'
                id='corporateHospitality'
                name='corporateHospitality'
                title='Corporate Hospitality'
                checked={formData.corporateHospitality}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <CheckListLabel htmlFor='corporateHospitality'>
                Corporate Hospitality
              </CheckListLabel>
            </div>
            <div>
              <CheckListItem
                type='checkbox'
                id='rangeEquipment'
                name='rangeEquipment'
                title='Range Equipment'
                checked={formData.rangeEquipment}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <CheckListLabel htmlFor='rangeEquipment'>
                Range Equipment
              </CheckListLabel>
            </div>
            <div>
              <CheckListItem
                type='checkbox'
                id='organizedCompetition'
                name='organizedCompetition'
                title='Organized Competition'
                checked={formData.organizedCompetition}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <CheckListLabel htmlFor='organizedCompetition'>
                Organized Competition
              </CheckListLabel>
            </div>
          </FormColumn>
        </FormRow>
        <ButtonsGroup>
          <Button css={{ backgroundColor: '$charcoalMedium' }} type='button'>
            Clear Selection
          </Button>
          {isEditing && (
            <Button color='purple' type='button'>
              Services Settings
            </Button>
          )}
        </ButtonsGroup>
      </FieldGroup>

      <FieldGroup>
        <FieldGroupTitle>Social Networks</FieldGroupTitle>
        <FormRow>
          <FormColumn>
            {socialNetworks.map(
              (socialMedia: FacilitySocialMedia, index: number) => (
                <FormRow
                  key={`${socialMedia.socialMedia}-${index.toString()}`}
                  css={{ marginTop: '$2', marginBottom: '$2' }}
                >
                  <FormColumn css={{ maxWidth: '25%' }}>
                    <FormLabel>Social Network</FormLabel>
                    <ReactSelect
                      name={`socialMedia[${index}].socialMedia`}
                      disabled={isDisabled}
                      styles={{ ...RSStyleOptions }}
                      options={facilitySocialMediasOptions}
                      width='100%'
                      defaultValue={getSelectedOption(
                        'socialMedia',
                        socialMedia.socialMedia
                      )}
                    />
                  </FormColumn>

                  <FormColumn>
                    <FormLabel>Url</FormLabel>
                    <Input
                      required
                      name={`socialMedia[${index}].socialMediaUrl`}
                      value={socialMedia.socialMediaUrl}
                      onChange={handleInputChange}
                      disabled={isDisabled}
                    />
                  </FormColumn>
                </FormRow>
              )
            )}
          </FormColumn>
        </FormRow>
        <Button
          type='button'
          css={{ backgroundColor: '$charcoalMedium' }}
          onClick={() =>
            setSocialNetworks((currentSocialNetworks: any) => [
              ...currentSocialNetworks,
              { socialMedia: '', socialMediaUrl: '' }
            ])
          }
        >
          <PlusIcon width={25} height={25} /> New Social Network
        </Button>
      </FieldGroup>

      <FieldGroup>
        <FieldGroupTitle>Payment Methods</FieldGroupTitle>
        <FormRow css={{ maxWidth: '50%' }}>
          <FormColumn>
            <div>
              <CheckListItem
                type='checkbox'
                id='Credit Card'
                name='Credit Card'
                title='Credit Card'
                checked={formData.paymentInformation.includes('Credit Card')}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <CheckListLabel htmlFor='Credit Card'>Credit Card</CheckListLabel>
            </div>
          </FormColumn>
          <FormColumn>
            <div>
              <CheckListItem
                type='checkbox'
                id='Bank Account'
                name='Bank Account'
                title='Bank Account'
                checked={formData.paymentInformation.includes('Bank Account')}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <CheckListLabel htmlFor='Bank Account'>
                Bank Account
              </CheckListLabel>
            </div>
          </FormColumn>
          <FormColumn>
            <div>
              <CheckListItem
                type='checkbox'
                id='PayPal'
                name='PayPal'
                title='PayPal'
                checked={formData.paymentInformation.includes('PayPal')}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <CheckListLabel htmlFor='PayPal'>PayPal</CheckListLabel>
            </div>
          </FormColumn>
          <FormColumn>
            <div>
              <CheckListItem
                type='checkbox'
                id='Check'
                name='Check'
                title='Check'
                checked={formData.paymentInformation.includes('Check')}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <CheckListLabel htmlFor='Check'>Check</CheckListLabel>
            </div>
          </FormColumn>
        </FormRow>
        <ButtonsGroup>
          <Button css={{ backgroundColor: '$charcoalMedium' }} type='button'>
            Clear Selection
          </Button>
          {isEditing && (
            <Button color='purple' type='button'>
              Payment Method Settings
            </Button>
          )}
        </ButtonsGroup>
      </FieldGroup>

      <ButtonsGroup css={{ marginTop: '$5' }}>
        <Button color='green' onClick={onFormSave} type='button'>
          Save Changes
        </Button>
        {isEditing && (
          <Button color='danger' onClick={onDelete} type='button'>
            Delete Facility
          </Button>
        )}
      </ButtonsGroup>
    </form>
  );
};
