import React from 'react';
import { styled } from 'stitches.config';

type ZonePreviewProps = {
  zone: {
    name: string;
    facilityName: string;
    size: string;
    lanes: number;
    devices: number;
    displays: number;
  };
  previewImg?: string;
};

const Container = styled('div', {
  padding: '$4',
  borderTop: '6px solid $brightGreen'
});

const Content = styled('div', {
  display: 'flex',
  gap: '$4',
  '& h4': {
    margin: 0,
    color: '$brightGreen'
  }
});

const Details = styled('div', {
  '& ul': {
    listStyle: 'none',
    padding: 0,
    marginY: '$3',
    fontSize: '$bodyNormal',
    lineHeight: '$3'
  },
  '& span': {
    fontWeight: 'bold'
  }
});

const ZoneImageContainer = styled('div', {
  height: 'fit-content',
  paddingLeft: '$4',
  borderLeft: '1px solid $mediumGray'
});

const ZoneImage = styled('img', {
  width: 600,
  height: 450,
  marginY: '$3',
  borderRadius: '$2',
  backgroundColor: '$lightGray'
});

export const ZonePreview = ({ zone, previewImg }: ZonePreviewProps) => {
  const { name, facilityName, size, lanes, devices, displays } = zone;

  return (
    <Container>
      <Content>
        <Details>
          <h4>Zone Details</h4>
          <ul>
            <li>
              <span>Name: </span>
              {name}
            </li>
            <li>
              <span>Facility: </span>
              {facilityName}
            </li>
            <li>
              <span>Size: </span>
              {size}
            </li>
            <li>
              <span>Shooting Positions: </span>
              {lanes}
            </li>
            <li>
              <span>Smart Devices: </span>
              {devices}
            </li>
            <li>
              <span>Smart Displays: </span>
              {displays}
            </li>
          </ul>
        </Details>
        <ZoneImageContainer>
          <h4>Preview</h4>

          {previewImg ? (
            <ZoneImage src={previewImg} alt='Zone diagram preview' />
          ) : (
            <p>Not available</p>
          )}
        </ZoneImageContainer>
      </Content>
    </Container>
  );
};
