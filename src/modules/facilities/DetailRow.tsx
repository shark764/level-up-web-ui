import React from 'react';
import { styled } from 'stitches.config';
import { Button } from '@styles/button';
import { useHistory } from 'react-router-dom';
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  TwitterIcon,
  WhatsAppIcon
} from '@modules/common/components';
import randomMap from '@styles/images/random-map.png';
import { ChevronUpIcon } from '@modulz/radix-icons';
import { ActionButton } from '@styles/table';
import { Facility, FacilitySocialMedia } from './useFacilitiesState';

const Title = styled('h4', {
  color: '$brightGreen'
});
const Wrapper = styled('div', {
  borderTop: '6px solid $brightGreen',
  padding: '$3',
  backgroundColor: '$charcoalLight',
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid $mediumGray'
});
const Column = styled('div', {
  width: '32%',
  '&:not(:last-child)': {
    borderRight: '1px solid $mediumGray'
  }
});
const LabelHeader = styled('span', {
  fontWeight: 700,
  fontSize: '$bodyNormal',
  lineHeight: '$3',
  color: '$offWhite'
});
const LabelDetail = styled('span', {
  fontWeight: 400,
  fontSize: '$bodyNormal',
  lineHeight: '$3',
  color: '$offWhite'
});
const WebSite = styled('a', {
  color: '$brightGreen'
});
const ButtonDetail = styled('button', {
  fontSize: 8,
  backgroundColor: 'inherit',
  border: '2px solid $brightGreen',
  borderRadius: '$1',
  color: '$brightGreen',
  fontWeight: 400,
  lineHeight: '$3',
  margin: '0 $1',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '$brightGreen',
    color: '$charcoalMedium'
  }
});
const IconWrapper = styled('span', {
  margin: '0 $1 0 0'
});

const ExpandRowWrapper = styled('div', {
  textAlign: 'center',
  backgroundColor: '$charcoalLight',
  borderBottomLeftRadius: '$1',
  borderBottomRightRadius: '$1',

  [`& ${ChevronUpIcon}`]: {
    opacity: 0
  },

  [`&:hover ${ChevronUpIcon}`]: {
    opacity: 1
  }
});

const socialMediaMap = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
  Twitter: TwitterIcon,
  WhatsApp: WhatsAppIcon
};

export function DetailRow({
  row,
  setSelectedContent,
  setShowDetailDialog
}: {
  row: Facility;
  setSelectedContent({
    id,
    contentType
  }: {
    id: string;
    contentType: string;
  }): void;
  setShowDetailDialog(show: boolean): void;
}) {
  const history = useHistory();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Wrapper>
        <Column>
          <Title>Facility Details</Title>
          <div>
            <LabelHeader>Name:</LabelHeader>{' '}
            <LabelDetail>{row.facilityName}</LabelDetail>
          </div>
          <div>
            <LabelHeader>Address:</LabelHeader>{' '}
            <LabelDetail>{row.address}</LabelDetail>
          </div>
          <div>
            <LabelHeader>Facility Type:</LabelHeader>{' '}
            <LabelDetail>
              {row.facilityType === 'Both'
                ? 'Indoor | Outdoor'
                : row.facilityType}
            </LabelDetail>
          </div>
          <div>
            <LabelHeader>Website:</LabelHeader>{' '}
            <LabelDetail>
              <WebSite
                target='_blank'
                href={row.facilityWebsiteUrl}
                rel='noreferrer'
              >
                {row.facilityWebsiteUrl}
              </WebSite>
            </LabelDetail>
          </div>
          <div>
            <LabelHeader>Phone Numbers:</LabelHeader>{' '}
            <LabelDetail>
              <ul>
                <li>{row.primaryPhoneNumber}</li>
                <li>{row.secondaryPhoneNumber}</li>
              </ul>
            </LabelDetail>
          </div>
          <div>
            <LabelHeader>Hours of Operation:</LabelHeader>{' '}
            <LabelDetail>
              <ul>
                <li>
                  <LabelHeader>Opening Time</LabelHeader>{' '}
                  {row.hoursOfOperation.opening}
                </li>
                <li>
                  <LabelHeader>Closing Time</LabelHeader>{' '}
                  {row.hoursOfOperation.closing}
                </li>
              </ul>
            </LabelDetail>
          </div>

          <Title>Facility Administrator</Title>
          <div>
            <LabelHeader>Name:</LabelHeader>{' '}
            <LabelDetail>{row.facilityAdministratorName}</LabelDetail>
          </div>
          <div>
            <LabelHeader>Phone:</LabelHeader>{' '}
            <LabelDetail>{row.facilityAdministratorPhone}</LabelDetail>
          </div>
          <div>
            <LabelHeader>Email:</LabelHeader>{' '}
            <LabelDetail>{row.facilityAdministratorEmail}</LabelDetail>
          </div>
        </Column>
        <Column>
          <Title>Facility Services</Title>
          <div>
            <ul>
              {row.rangeIoTEnabled && (
                <li>
                  <LabelDetail>Range IoT Enabled</LabelDetail>
                </li>
              )}
              {row.rangeMembership && (
                <li>
                  <LabelDetail>Range memberships</LabelDetail>
                </li>
              )}
              {row.walkInRangeUsers && (
                <li>
                  <LabelDetail>Walk-In Range Users</LabelDetail>
                </li>
              )}
              {row.firearmsRentals && (
                <li>
                  <LabelDetail>Firearms Rentals</LabelDetail>
                </li>
              )}
              {row.retailSales && (
                <li>
                  <LabelDetail>Retail Sales</LabelDetail>{' '}
                  <ButtonDetail
                    type='button'
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedContent({
                        id: row.id,
                        contentType: 'retailSales'
                      });
                      setShowDetailDialog(true);
                    }}
                  >
                    View Details
                  </ButtonDetail>
                </li>
              )}
              {row.cafeteria && (
                <li>
                  <LabelDetail>Cafeteria</LabelDetail>{' '}
                  <ButtonDetail
                    type='button'
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedContent({
                        id: row.id,
                        contentType: 'cafeteria'
                      });
                      setShowDetailDialog(true);
                    }}
                  >
                    View Details
                  </ButtonDetail>
                </li>
              )}
              {row.trainingClasses && (
                <li>
                  <LabelDetail>Training Classes</LabelDetail>{' '}
                  <ButtonDetail
                    type='button'
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedContent({
                        id: row.id,
                        contentType: 'trainingClasses'
                      });
                      setShowDetailDialog(true);
                    }}
                  >
                    View Details
                  </ButtonDetail>
                </li>
              )}
              {row.events && (
                <li>
                  <LabelDetail>Events</LabelDetail>{' '}
                  <ButtonDetail
                    type='button'
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedContent({
                        id: row.id,
                        contentType: 'events'
                      });
                      setShowDetailDialog(true);
                    }}
                  >
                    View Details
                  </ButtonDetail>
                </li>
              )}
              {row.corporateHospitality && (
                <li>
                  <LabelDetail>Corporate Hospitality</LabelDetail>
                </li>
              )}
              {row.rangeEquipment && (
                <li>
                  <LabelDetail>Range Equipment</LabelDetail>{' '}
                  <ButtonDetail
                    type='button'
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedContent({
                        id: row.id,
                        contentType: 'rangeEquipment'
                      });
                      setShowDetailDialog(true);
                    }}
                  >
                    View Details
                  </ButtonDetail>
                </li>
              )}
            </ul>
          </div>
          <Title>Payment Methods</Title>
          <div>
            <ul>
              {row.paymentInformation.map((pMethod: string) => (
                <li key={pMethod}>
                  <LabelDetail>{pMethod}</LabelDetail>
                </li>
              ))}
            </ul>
          </div>
        </Column>
        <Column>
          <Title>Social Networks</Title>
          {row.socialMedia.map((socialMedia: FacilitySocialMedia) => {
            const SocialMediaIcon = socialMediaMap[socialMedia.socialMedia];
            if (!SocialMediaIcon) {
              return null;
            }
            return (
              <IconWrapper key={socialMedia.socialMedia}>
                <SocialMediaIcon />
              </IconWrapper>
            );
          })}
          <Title>Location</Title>
          <div>
            <img
              style={{ height: 140, width: 300 }}
              src={randomMap}
              alt='Facility address'
            />
          </div>
          <Title>Zones</Title>
          <Button
            css={{ backgroundColor: '$mediumGray' }}
            onClick={() => history.push(`/zones?facility=${row.id}`)}
          >
            Filter Zones By This Facility
          </Button>
        </Column>
      </Wrapper>
      <ExpandRowWrapper>
        <ActionButton
          css={{
            '&:hover': {
              backgroundColor: '$charcoalMedium'
            }
          }}
        >
          Show Less <ChevronUpIcon />
        </ActionButton>
      </ExpandRowWrapper>
    </div>
  );
}
