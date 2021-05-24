import * as React from 'react';
import { countries, states } from '@modules/common/utils';
import { InputGroup } from '@styles/form';

export const Detail = ({ data }: { data: any }) => {
  return (
    <div>
      <InputGroup>
        <h4>Name</h4>
        <span>{data.facilityName}</span>
      </InputGroup>

      <InputGroup>
        <h4>Phone Number</h4>
        <span>{data.primaryPhoneNumber}</span>
      </InputGroup>

      <InputGroup>
        <h4>Secondary Phone Number</h4>
        <span>{data.secondaryPhoneNumber}</span>
      </InputGroup>

      <InputGroup>
        <h4>Address</h4>
        <span>{data.address}</span>
      </InputGroup>

      <InputGroup>
        <h4>City</h4>
        <span>{data.city}</span>
      </InputGroup>

      <InputGroup>
        <h4>State</h4>
        {states.find((state) => state.code === data.state)?.name || ''}
      </InputGroup>

      <InputGroup>
        <h4>ZIP</h4>
        <span>{data.zip}</span>
      </InputGroup>

      <InputGroup>
        <h4>Country</h4>
        <span>
          {countries.find((country) => country.code === data.country)?.name ||
            ''}
        </span>
      </InputGroup>

      <InputGroup>
        <h4>Website Url</h4>
        <span>{data.facilityWebsiteUrl}</span>
      </InputGroup>

      <InputGroup>
        <h4>Type</h4>
        <span>{data.facilityType}</span>
      </InputGroup>

      <InputGroup>
        <h4>Size</h4>
        <span>{data.facilitySize}</span>
      </InputGroup>

      <InputGroup>
        <h4>Building Size</h4>
        <span>{data.facilityBuildingSize}</span>
      </InputGroup>

      <InputGroup>
        <h4>Number of Zones</h4>
        <span>{data.numberOfZones}</span>
      </InputGroup>

      <InputGroup>
        <h4>Social Media</h4>
        <span>{data.socialMedia}</span>
      </InputGroup>

      <InputGroup>
        <h4>Social Media Url</h4>
        <span>{data.socialMediaUrl}</span>
      </InputGroup>

      <InputGroup>
        <h4>Administrator</h4>
        <span>{data.facilityAdministratorName}</span>
      </InputGroup>

      <InputGroup>
        <h4>Administrator Phone</h4>
        <span>{data.facilityAdministratorPhone}</span>
      </InputGroup>

      <InputGroup>
        <h4>Administrator Email</h4>
        <span>{data.facilityAdministratorEmail}</span>
      </InputGroup>

      <InputGroup>
        <h4>Hours Of Operation</h4>
        <span>{data.hoursOfOperation}</span>
      </InputGroup>

      <InputGroup>
        <h4>Payment Information</h4>
        <span>{data.paymentInformation}</span>
      </InputGroup>

      <InputGroup>
        <h4>NSSF Member</h4>
        <span>{data.nssfMember ? 'Yes' : 'No'}</span>
      </InputGroup>

      <InputGroup>
        <h4>NSSF Rating</h4>
        <span>{data.nssfRating}</span>
      </InputGroup>

      <InputGroup>
        <h4>Range IoT Enabled</h4>
        <span>{data.rangeIoTEnabled ? 'Yes' : 'No'}</span>
      </InputGroup>

      <InputGroup>
        <h4>Services</h4>
        <span>{data.facilityServices}</span>
      </InputGroup>

      <InputGroup>
        <h4>Category</h4>
        <span>{data.category}</span>
      </InputGroup>

      <InputGroup>
        <h4>Subcategory</h4>
        <span>{data.subcategory}</span>
      </InputGroup>

      <InputGroup>
        <h4>Secuence</h4>
        <span>{data.secuence}</span>
      </InputGroup>
    </div>
  );
};
