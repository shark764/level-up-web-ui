import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '@modules/auth';
import { compareByKey } from '@modules/common/utils';
import {
  Pencil1Icon,
  AlertDialog,
  UserMenu,
  PlusIcon,
  FiltersV2 as Filters,
  StarFilledIcon,
  StarIcon,
  MagnifyingGlassIcon,
  TrashCanIcon,
  TrashCircleIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon
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
import { Button } from '@styles/button';
import {
  Header,
  Title,
  SubTitle,
  PageContent,
  FiltersContainer,
  EmptyImage,
  EmptyTitle
} from '@styles/page';
import { styled } from 'stitches.config';
import {
  Input,
  SwitchField,
  SwitchFieldInput,
  SwitchFieldLabel
} from '@styles/form';
import { ReactSelect } from '@modules/common/components/ReactSelect';
import { InfoDialog } from '@modules/common/components/InfoDialog';
import { Facility, useFacilitiesState } from './useFacilitiesState';
import { DetailRow } from './DetailRow';

const LabelMain = styled('span', {
  fontSize: '$heading3',
  fontWeight: 700,
  color: '$offWhite',
  lineHeight: '$1'
});
const LabelDetail = styled('span', {
  fontSize: '$bodyNormal',
  fontWeight: 400,
  color: '$offWhite',
  lineHeight: '$3',
  display: 'block',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  fontStyle: 'normal'
});
const FilterButton = styled(Button, {
  fontSize: '$bodyNormal'
});

const ButtonsWrapper = styled('div', {
  justifyContent: 'flex-end',
  display: 'flex',
  gap: 15
});

const NSSFWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 5
});
const NSSFLabel = styled('div', {
  border: '2px solid $brightGreen',
  padding: '6px 25px',
  borderRadius: 59,
  color: '$brightGreen',
  fontWeight: 400,
  lineHeight: '$3',
  marginLeft: 15
});

const ControlsWrapper = styled('div', {
  display: 'flex',
  gap: 15,
  flex: 1
});
const SearchContainer = styled('div', {
  display: 'inline-flex',
  position: 'relative',
  borderRadius: 6,
  overflow: 'hidden',
  marginLeft: 50,
  width: '33%'
});
const SearchInput = styled(Input, {
  fontWeight: 400,
  fontStyle: 'normal',
  width: '100%',
  borderLeft: 0,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0
});
const SearchIcon = styled('i', {
  padding: '0.5rem 0.1rem 0.5rem 0.5rem ',
  backgroundColor: '$charcoalMedium',
  border: '1px solid $charcoalLight',
  borderRight: 0
});

const SwitchFieldLabel2 = styled(SwitchFieldLabel, {
  backgroundColor: '$charcoalMedium',
  border: '1px solid $royalPurple',
  flex: 'auto'
});
const SwitchFieldInput2 = styled(SwitchFieldInput, {
  [`&:checked + ${SwitchFieldLabel2}`]: {
    backgroundColor: '$royalPurple',
    boxShadow: 'none'
  }
});

const ClearRating = styled('button', {
  fontSize: '$bodySmall',
  backgroundColor: 'inherit',
  border: '2px solid $royalPurple',
  borderRadius: '$1',
  color: '$royalPurple',
  fontWeight: 400,
  lineHeight: '$3',
  margin: '0 $1',
  '&:hover': {
    backgroundColor: '$royalPurple',
    color: '$charcoalMedium'
  }
});
const ActionsWrapper = styled('div', {
  textAlign: 'end',
  display: 'flex',
  flexDirection: 'column'
});

const ConstrolsGroup = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap'
});

const DetailInfoHeader = styled('span', {
  display: 'block',
  color: '$lightGray',
  fontWeight: 400,
  fontSize: '$bodyLarge',
  lineHeight: '$3'
});
const DetailInfoBlock = styled('div', {
  margin: '$2 $4',
  color: '$mediumGray',
  fontSize: '$bodyNormal',

  '& ul li': {
    padding: '$1'
  }
});
const WarningBlock = styled('div', {
  padding: 16,
  color: '$warning',
  borderRadius: 12,
  border: '1px solid $warning',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  '& svg': {
    display: 'block'
  },

  '& span': {
    fontSize: '$bodySmall'
  }
});
const DetailTable = styled('table', {
  '& thead th, & tbody td': {
    padding: '$1',
    textAlign: 'left'
  }
});

const FilterCheckboxLabel = styled('div', {
  fontSize: '$bodyNormal',
  color: '$offWhite',
  fontWeight: 400,
  lineHeight: '$3'
});
const FiltersFlexGroupLabel = styled('label', {
  fontSize: '$bodyNormal',
  color: '$lightGray',
  fontWeight: 700,
  lineHeight: '$4'
});
const FiltersFlexGroup = styled('div', {
  padding: '$2 $3'
});
const FiltersFlexContainer = styled('div', {
  fontSize: '$bodyNormal',
  color: '$charcoalLight',
  display: 'flex',
  WebkitFlexWrap: 'wrap',
  flexWrap: 'wrap',
  padding: '$2',
  alignItems: 'flex-start',

  '&:not(:last-child)': {
    borderBottom: '1px solid $charcoalLight'
  }
});

const TableRowContent = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '$3'
});
const ExpandRowWrapper = styled('div', {
  textAlign: 'center',

  [`& ${ChevronDownIcon}`]: {
    opacity: 0
  },

  [`&:hover ${ChevronDownIcon}`]: {
    opacity: 1
  }
});

const FilterRatingIcon = styled(StarIcon, {
  cursor: 'pointer'
});
const FilterRatingFilledIcon = styled(StarFilledIcon, {
  cursor: 'pointer'
});

interface DetailContentMap {
  [key: string]: {
    title: string;
    prepareContent(data: Facility | undefined): React.ReactElement;
  };
}
const detailContentMap: DetailContentMap = {
  retailSales: {
    title: 'Retail Sales',
    prepareContent: ({ retailSalesDetail }: Facility) => (
      <>
        <DetailInfoBlock>
          <div>
            <DetailInfoHeader>Unrestricted Items</DetailInfoHeader>
            <span>({retailSalesDetail?.unrestrictedItems?.join(', ')})</span>
          </div>
        </DetailInfoBlock>
        <DetailInfoBlock>
          <div>
            <DetailInfoHeader>Restricted Items</DetailInfoHeader>
            <span>({retailSalesDetail?.restrictedItems?.join(', ')})</span>
          </div>
        </DetailInfoBlock>
        <DetailInfoBlock>
          <WarningBlock>
            <ExclamationTriangleIcon color='#FADC64' width={22} height={22} />
            <span>Requires Licenses, Log In and Record Keeping</span>
          </WarningBlock>
        </DetailInfoBlock>
      </>
    )
  },
  cafeteria: {
    title: 'Cafeteria',
    prepareContent: ({ cafeteriaDetail }: Facility) => (
      <>
        <DetailInfoBlock css={{ textAlign: 'left' }}>
          <ul>
            <li>
              <span>
                <span style={{ fontWeight: 'bold' }}>Size: </span>
                {cafeteriaDetail.size} seats
              </span>
            </li>
            {cafeteriaDetail.food && <li>Food</li>}
            {cafeteriaDetail.beverage && <li>Beverage</li>}
            {cafeteriaDetail.alcohol && <li>Alcohol</li>}
            {cafeteriaDetail.snacks && <li>Snacks</li>}
            {cafeteriaDetail.vendingMachines && <li>Vending Machines</li>}
          </ul>
        </DetailInfoBlock>
      </>
    )
  },
  trainingClasses: {
    title: 'Training Classes',
    prepareContent: ({ trainingClassesDetail }: Facility) => (
      <>
        <DetailInfoBlock>
          <div>
            <DetailInfoHeader>Youth Programs</DetailInfoHeader>
            <span>({trainingClassesDetail?.youthPrograms?.join(', ')})</span>
          </div>
        </DetailInfoBlock>
        <DetailInfoBlock>
          <div>
            <DetailInfoHeader>Private Instruction</DetailInfoHeader>
            <span>
              ({trainingClassesDetail?.privateInstruction?.join(', ')})
            </span>
          </div>
        </DetailInfoBlock>
      </>
    )
  },
  events: {
    title: 'Events',
    prepareContent: ({ eventList }: Facility) => (
      <>
        <DetailInfoBlock css={{ textAlign: 'left' }}>
          <ul>
            {eventList.map((event: string, index: number) => (
              <li key={index.toString()}>{event}</li>
            ))}
          </ul>
        </DetailInfoBlock>
      </>
    )
  },
  rangeEquipment: {
    title: 'Range Equipment',
    prepareContent: ({ rangeEquipmentDetail }: Facility) => (
      <>
        <DetailInfoBlock css={{ textAlign: 'left' }}>
          <DetailTable>
            <thead>
              <tr>
                <th>Category</th>
                <th>Manufacturers</th>
              </tr>
            </thead>
            <tbody>
              {rangeEquipmentDetail.airFiltering && (
                <tr>
                  <td>Air Filtering</td>
                  <td>
                    {rangeEquipmentDetail.airFilteringManufacturers.join(', ')}
                  </td>
                </tr>
              )}
              {rangeEquipmentDetail.carriers && (
                <tr>
                  <td>Carriers</td>
                  <td>
                    {rangeEquipmentDetail.carriersManufacturers.join(', ')}
                  </td>
                </tr>
              )}
              {rangeEquipmentDetail.stalls && (
                <tr>
                  <td>Stalls</td>
                  <td>{rangeEquipmentDetail.stallsManufacturers.join(', ')}</td>
                </tr>
              )}
              {rangeEquipmentDetail.virtualExperience && (
                <tr>
                  <td>Virtual Experience</td>
                  <td>
                    {rangeEquipmentDetail.virtualExperienceManufacturers.join(
                      ', '
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </DetailTable>
        </DetailInfoBlock>
      </>
    )
  }
};

const sortOptions: any = {
  'name-asc': { key: 'facilityName', order: 'asc' },
  'name-desc': { key: 'facilityName', order: 'desc' },
  'creation-date': { key: 'createdAt', order: 'asc' }
};
const sortRSelectOptions: any = [
  { value: 'name-asc', label: 'Sort By Name (A-Z)' },
  { value: 'name-desc', label: 'Sort By Name (Z-A)' },
  { value: 'creation-date', label: 'Sort By Creation Date' }
];

const getDetailTitle = ({ contentType }: { id: string; contentType: string }) =>
  detailContentMap[contentType]?.title || '';

/**
 * Filtering logic
 */
function filterFacilities(array: Facility[], filters: any, values: any) {
  const filterKeys = Object.keys(filters);
  return array.filter((item: any) =>
    filterKeys.every((key: string) => {
      if (typeof filters[key] !== 'function') {
        return true;
      }
      // We send item value, filter value
      // and whole data (in case of needed)
      return filters[key](item[key], values[key], item);
    })
  );
}
const filterCriteria = {
  facilityName: (data: string, value: string) =>
    data.toLowerCase().includes(value.toLowerCase()),
  facilityType: (data: string, value: string) =>
    value === '' ? true : data === value,
  nssfMember: (data: boolean, value: string) => {
    if (value === 'Both') {
      return true;
    }
    if (value === 'Member' && data) {
      return true;
    }
    if (value === 'Non-Member' && !data) {
      return true;
    }
    return false;
  },
  nssfRating: (data: number, value: number, row: Facility) => {
    if (value === 0) {
      return true;
    }
    if (!row.nssfMember) {
      return true;
    }
    return data >= value;
  },
  rangeIoTEnabled: (data: boolean, value: boolean) =>
    !value ? true : data === value,
  rangeMembership: (data: boolean, value: boolean) =>
    !value ? true : data === value,
  walkInRangeUsers: (data: boolean, value: boolean) =>
    !value ? true : data === value,
  firearmsRentals: (data: boolean, value: boolean) =>
    !value ? true : data === value,
  retailSales: (data: boolean, value: boolean) =>
    !value ? true : data === value,
  cafeteria: (data: boolean, value: boolean) =>
    !value ? true : data === value,
  trainingClasses: (data: boolean, value: boolean) =>
    !value ? true : data === value,
  events: (data: boolean, value: boolean) => (!value ? true : data === value),
  corporateHospitality: (data: boolean, value: boolean) =>
    !value ? true : data === value,
  rangeEquipment: (data: boolean, value: boolean) =>
    !value ? true : data === value,
  organizedCompetition: (data: boolean, value: boolean) =>
    !value ? true : data === value,
  paymentInformation: (data: string[], value: string[]) =>
    value.length > 0
      ? data.filter((pMethod: string) => value.includes(pMethod)).length > 0
      : true
};
const filterDefaultValues: any = {
  facilityName: '',
  facilityType: '',
  nssfMember: 'Both',
  nssfRating: 0,
  rangeIoTEnabled: false,
  rangeMembership: false,
  walkInRangeUsers: false,
  firearmsRentals: false,
  retailSales: false,
  cafeteria: false,
  trainingClasses: false,
  events: false,
  corporateHospitality: false,
  rangeEquipment: false,
  organizedCompetition: false,
  paymentInformation: []
};

export const Facilities = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { facilities, delete: deleteFacility } = useFacilitiesState();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState('');
  const [facilitiesFilter, setFacilitiesFilter] = useState(facilities);
  const [sortOrder, setSortOrder] = useState({
    key: 'facilityName',
    order: 'asc'
  });
  const [rowsChecked, setRowsChecked]: any = useState({}); // {key: checked}
  const [expanded, setExpanded] = useState('');
  const [selectedContent, setSelectedContent] = useState({
    id: '',
    contentType: ''
  });
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [filterValues, setFilterValues] = useState(filterDefaultValues);

  useEffect(() => {
    const filtered = filterFacilities(
      facilities.sort(compareByKey(sortOrder.key, sortOrder.order)),
      filterCriteria,
      filterValues
    );
    setFacilitiesFilter(filtered);
  }, [facilities, filterValues, sortOrder]);

  const handlerRowChecked = (id: string, checked: boolean) => {
    setRowsChecked((currentChecked: any) => {
      if (!checked) {
        const newChecked = { ...currentChecked };
        delete newChecked[id];
        return newChecked;
      }
      return { ...currentChecked, [id]: checked };
    });
  };

  const handleRemoveRows = () => {
    setFacilitiesFilter((currentFiltered: Facility[]) =>
      currentFiltered.filter(
        (filteredRow: Facility) => !!rowsChecked[filteredRow.id] === false
      )
    );
    setRowsChecked({});
  };

  const getDetailContent = ({
    id,
    contentType
  }: {
    id: string;
    contentType: string;
  }) =>
    detailContentMap[contentType]?.prepareContent(
      facilities.find((f: Facility) => f.id === id)
    );

  const handleSortChange = (selectedOption: {
    value: string;
    label: string;
  }) => {
    const { key, order } = sortOptions[selectedOption.value];
    setSortOrder({ key, order });
  };

  const handleFilterInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value =
      e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setFilterValues((currentFilterValues: any) => ({
      ...currentFilterValues,
      [e.target.name]: value
    }));
  };
  const handleFilterPaymentInformation = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = (e.target as HTMLInputElement).checked;

    setFilterValues((currentFilterValues: any) => ({
      ...currentFilterValues,
      paymentInformation: value
        ? [...currentFilterValues.paymentInformation, e.target.name]
        : currentFilterValues.paymentInformation.filter(
            (fValue: string) => fValue !== e.target.name
          )
    }));
  };

  if (!facilities || facilities.length === 0) {
    return (
      <>
        <Header>
          <div>
            <Title>Facilities</Title>
            <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
          </div>
          <UserMenu />
        </Header>
        <PageContent
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '$3'
          }}
        >
          <EmptyTitle>Oops! There are no facilities yet!</EmptyTitle>
          <EmptyImage src='/assets/img/new_entry.svg' />

          <Button
            color='green'
            onClick={() => history.push('/facilities/create')}
          >
            New Facility <PlusIcon />
          </Button>
        </PageContent>
      </>
    );
  }

  return (
    <>
      <Header>
        <div>
          <Title>Facilities</Title>
          <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
        </div>
        <FiltersContainer>
          <Filters.Root
            content={
              <>
                <FiltersFlexContainer>
                  <FiltersFlexGroup
                    css={{ borderRight: '1px solid $charcoalLight' }}
                  >
                    <FiltersFlexGroupLabel>Type</FiltersFlexGroupLabel>
                    <SwitchField>
                      <SwitchFieldInput2
                        type='radio'
                        name='facilityType'
                        value='Indoor'
                        checked={filterValues.facilityType === 'Indoor'}
                        onChange={handleFilterInputChange}
                        id='facilityType-Indoor'
                      />
                      <SwitchFieldLabel2 htmlFor='facilityType-Indoor'>
                        Indoor
                      </SwitchFieldLabel2>
                      <SwitchFieldInput2
                        type='radio'
                        name='facilityType'
                        value='Outdoor'
                        checked={filterValues.facilityType === 'Outdoor'}
                        onChange={handleFilterInputChange}
                        id='facilityType-Outdoor'
                      />
                      <SwitchFieldLabel2 htmlFor='facilityType-Outdoor'>
                        Outdoor
                      </SwitchFieldLabel2>
                      <SwitchFieldInput2
                        type='radio'
                        name='facilityType'
                        value='Both'
                        checked={filterValues.facilityType === 'Both'}
                        onChange={handleFilterInputChange}
                        id='facilityType-Both'
                      />
                      <SwitchFieldLabel2 htmlFor='facilityType-Both'>
                        Both
                      </SwitchFieldLabel2>
                    </SwitchField>
                  </FiltersFlexGroup>
                  <FiltersFlexGroup>
                    <FiltersFlexGroupLabel>NSSF</FiltersFlexGroupLabel>
                    <SwitchField>
                      <SwitchFieldInput2
                        type='radio'
                        name='nssfMember'
                        value='Member'
                        checked={filterValues.nssfMember === 'Member'}
                        onChange={handleFilterInputChange}
                        id='nssfMember-Member'
                      />
                      <SwitchFieldLabel2 htmlFor='nssfMember-Member'>
                        Member
                      </SwitchFieldLabel2>
                      <SwitchFieldInput2
                        type='radio'
                        name='nssfMember'
                        value='Non-Member'
                        checked={filterValues.nssfMember === 'Non-Member'}
                        onChange={handleFilterInputChange}
                        id='nssfMember-Non-Member'
                      />
                      <SwitchFieldLabel2 htmlFor='nssfMember-Non-Member'>
                        Non-Member
                      </SwitchFieldLabel2>
                      <SwitchFieldInput2
                        type='radio'
                        name='nssfMember'
                        value='Both'
                        checked={filterValues.nssfMember === 'Both'}
                        onChange={handleFilterInputChange}
                        id='nssfMember-Both'
                      />
                      <SwitchFieldLabel2 htmlFor='nssfMember-Both'>
                        Both
                      </SwitchFieldLabel2>
                    </SwitchField>
                  </FiltersFlexGroup>
                  <FiltersFlexGroup>
                    <FiltersFlexGroupLabel>Ratings</FiltersFlexGroupLabel>
                    <div style={{ display: 'flex', alignSelf: 'center' }}>
                      {Array(5)
                        .fill(0)
                        .map((_, i) => {
                          const FilterStarIcon =
                            i < filterValues.nssfRating
                              ? FilterRatingFilledIcon
                              : FilterRatingIcon;
                          return (
                            <FilterStarIcon
                              color='#6461EC'
                              key={i.toString()}
                              width={25}
                              height={25}
                              onClick={() =>
                                setFilterValues((currentFilterValues: any) => ({
                                  ...currentFilterValues,
                                  nssfRating: i + 1
                                }))
                              }
                            />
                          );
                        })}
                      <ClearRating
                        type='button'
                        onClick={() =>
                          setFilterValues((currentFilterValues: any) => ({
                            ...currentFilterValues,
                            nssfRating: 0
                          }))
                        }
                      >
                        Clear Rating
                      </ClearRating>
                    </div>
                  </FiltersFlexGroup>
                  <FiltersFlexGroup
                    css={{
                      justifyContent: 'flex-end',
                      display: 'flex',
                      gap: '15px',
                      flex: '1',
                      alignItems: 'center'
                    }}
                  >
                    <FilterButton
                      type='button'
                      css={{ backgroundColor: '$charcoalLight' }}
                      onClick={() =>
                        setFilterValues({
                          ...filterDefaultValues,
                          // Preserving facilityName filter
                          facilityName: filterValues.facilityName
                        })
                      }
                    >
                      Clear Filters
                    </FilterButton>

                    <FilterButton type='button' color='green'>
                      Filter
                    </FilterButton>
                  </FiltersFlexGroup>
                </FiltersFlexContainer>

                <FiltersFlexContainer>
                  <FiltersFlexGroup>
                    <Filters.FilterTitle>Facility Services</Filters.FilterTitle>
                    <FiltersFlexContainer>
                      <FiltersFlexGroup>
                        <FilterCheckboxLabel>
                          <input
                            type='checkbox'
                            id='rangeIoTEnabled'
                            name='rangeIoTEnabled'
                            checked={filterValues.rangeIoTEnabled}
                            onChange={handleFilterInputChange}
                          />
                          <label htmlFor='rangeIoTEnabled'>
                            Range IoT Enabled
                          </label>
                        </FilterCheckboxLabel>
                        <FilterCheckboxLabel>
                          <input
                            type='checkbox'
                            id='rangeMembership'
                            name='rangeMembership'
                            checked={filterValues.rangeMembership}
                            onChange={handleFilterInputChange}
                          />
                          <label htmlFor='rangeMembership'>
                            Range Membership
                          </label>
                        </FilterCheckboxLabel>
                        <FilterCheckboxLabel>
                          <input
                            type='checkbox'
                            id='walkInRangeUsers'
                            name='walkInRangeUsers'
                            checked={filterValues.walkInRangeUsers}
                            onChange={handleFilterInputChange}
                          />
                          <label htmlFor='walkInRangeUsers'>
                            Walk-In Range Users
                          </label>
                        </FilterCheckboxLabel>
                      </FiltersFlexGroup>
                      <FiltersFlexGroup>
                        <FilterCheckboxLabel>
                          <input
                            type='checkbox'
                            id='firearmsRentals'
                            name='firearmsRentals'
                            checked={filterValues.firearmsRentals}
                            onChange={handleFilterInputChange}
                          />
                          <label htmlFor='firearmsRentals'>
                            Firearms Rentals
                          </label>
                        </FilterCheckboxLabel>
                        <FilterCheckboxLabel>
                          <input
                            type='checkbox'
                            id='retailSales'
                            name='retailSales'
                            checked={filterValues.retailSales}
                            onChange={handleFilterInputChange}
                          />
                          <label htmlFor='retailSales'>Retail Sales</label>
                        </FilterCheckboxLabel>
                        <FilterCheckboxLabel>
                          <input
                            type='checkbox'
                            id='cafeteria'
                            name='cafeteria'
                            checked={filterValues.cafeteria}
                            onChange={handleFilterInputChange}
                          />
                          <label htmlFor='cafeteria'>Cafeteria</label>
                        </FilterCheckboxLabel>
                      </FiltersFlexGroup>
                      <FiltersFlexGroup>
                        <FilterCheckboxLabel>
                          <input
                            type='checkbox'
                            id='trainingClasses'
                            name='trainingClasses'
                            checked={filterValues.trainingClasses}
                            onChange={handleFilterInputChange}
                          />
                          <label htmlFor='trainingClasses'>
                            Training Classes
                          </label>
                        </FilterCheckboxLabel>
                        <FilterCheckboxLabel>
                          <input
                            type='checkbox'
                            id='events'
                            name='events'
                            checked={filterValues.events}
                            onChange={handleFilterInputChange}
                          />
                          <label htmlFor='events'>Events</label>
                        </FilterCheckboxLabel>
                        <FilterCheckboxLabel>
                          <input
                            type='checkbox'
                            id='corporateHospitality'
                            name='corporateHospitality'
                            checked={filterValues.corporateHospitality}
                            onChange={handleFilterInputChange}
                          />
                          <label htmlFor='corporateHospitality'>
                            Corporate Hospitality
                          </label>
                        </FilterCheckboxLabel>
                      </FiltersFlexGroup>
                      <FiltersFlexGroup
                        css={{ borderRight: '1px solid $charcoalLight' }}
                      >
                        <FilterCheckboxLabel>
                          <input
                            type='checkbox'
                            id='rangeEquipment'
                            name='rangeEquipment'
                            checked={filterValues.rangeEquipment}
                            onChange={handleFilterInputChange}
                          />
                          <label htmlFor='rangeEquipment'>
                            Range Equipment
                          </label>
                        </FilterCheckboxLabel>
                        <FilterCheckboxLabel>
                          <input
                            type='checkbox'
                            id='organizedCompetition'
                            name='organizedCompetition'
                            checked={filterValues.organizedCompetition}
                            onChange={handleFilterInputChange}
                          />
                          <label htmlFor='organizedCompetition'>
                            Organized Competition
                          </label>
                        </FilterCheckboxLabel>
                      </FiltersFlexGroup>
                    </FiltersFlexContainer>
                  </FiltersFlexGroup>
                  <FiltersFlexGroup>
                    <Filters.FilterTitle>Payment Methods</Filters.FilterTitle>
                    <FiltersFlexContainer>
                      <FiltersFlexGroup>
                        <FilterCheckboxLabel>
                          <input
                            type='checkbox'
                            id='Credit Card'
                            name='Credit Card'
                            checked={filterValues.paymentInformation.includes(
                              'Credit Card'
                            )}
                            onChange={handleFilterPaymentInformation}
                          />
                          <label htmlFor='Credit Card'>Credit Card</label>
                        </FilterCheckboxLabel>
                        <FilterCheckboxLabel>
                          <input
                            type='checkbox'
                            id='Bank Account'
                            name='Bank Account'
                            checked={filterValues.paymentInformation.includes(
                              'Bank Account'
                            )}
                            onChange={handleFilterPaymentInformation}
                          />
                          <label htmlFor='Bank Account'>Bank Account</label>
                        </FilterCheckboxLabel>
                        <FilterCheckboxLabel>
                          <input
                            type='checkbox'
                            id='PayPal'
                            name='PayPal'
                            checked={filterValues.paymentInformation.includes(
                              'PayPal'
                            )}
                            onChange={handleFilterPaymentInformation}
                          />
                          <label htmlFor='PayPal'>PayPal</label>
                        </FilterCheckboxLabel>
                      </FiltersFlexGroup>
                      <FiltersFlexGroup>
                        <FilterCheckboxLabel>
                          <input
                            type='checkbox'
                            id='Check'
                            name='Check'
                            checked={filterValues.paymentInformation.includes(
                              'Check'
                            )}
                            onChange={handleFilterPaymentInformation}
                          />
                          <label htmlFor='Check'>Check</label>
                        </FilterCheckboxLabel>
                      </FiltersFlexGroup>
                    </FiltersFlexContainer>
                  </FiltersFlexGroup>
                </FiltersFlexContainer>
              </>
            }
          />
        </FiltersContainer>
        <UserMenu />
      </Header>

      <PageContent>
        <ConstrolsGroup>
          <ControlsWrapper>
            <SearchContainer>
              <SearchIcon>
                <MagnifyingGlassIcon width={35} height={35} color='#5D5F83' />
              </SearchIcon>
              <SearchInput
                type='text'
                name='facilityName'
                placeholder='Search By Name...'
                value={filterValues.facilityName}
                onChange={handleFilterInputChange}
              />
            </SearchContainer>

            <ReactSelect
              name='sort-option'
              onChange={handleSortChange}
              title='Change Sort Option'
              defaultValue={sortRSelectOptions[0]}
              styles={{
                container: (provided: any) => ({
                  ...provided,
                  alignSelf: 'center'
                }),
                control: (provided: any, state: any) => ({
                  ...provided,
                  background: 'none',
                  border: 'none',
                  width: state.selectProps.width,
                  boxShadow: 'none',
                  fontSize: 16,
                  color: '#9BB1D2',
                  '&:hover': {
                    boxShadow: 'none'
                  }
                }),
                singleValue: (provided: any, state: any) => ({
                  ...provided,
                  opacity: state.isDisabled ? 0.5 : 1,
                  transition: 'opacity 300ms',
                  fontSize: 16,
                  color: '#9BB1D2'
                }),
                option: (provided: any, state: any) => ({
                  ...provided,
                  fontSize: 18,
                  color: state.isSelected ? '#5D5F83' : '#9BB1D2',
                  backgroundColor: state.isSelected ? '#C6D6EE' : '#F5F9FF',
                  padding: 20,
                  border: 'none',
                  '&:hover': {
                    backgroundColor: '#14162B',
                    color: '#F5F9FF'
                  }
                })
              }}
              options={sortRSelectOptions}
              width='220px'
            />
          </ControlsWrapper>

          <ButtonsWrapper>
            {Object.keys(rowsChecked).length > 0 && (
              <Button color='danger' onClick={() => setShowDeleteDialog(true)}>
                Delete All <TrashCanIcon />
              </Button>
            )}
            <Button
              color='green'
              onClick={() => history.push('/facilities/create')}
            >
              New Facility <PlusIcon width={25} height={25} />
            </Button>
          </ButtonsWrapper>
        </ConstrolsGroup>

        <Table>
          <TableHead>
            <tr>
              <TableHeader style={{ width: 50, maxWidth: 100 }} />
              <TableHeader />
              <TableHeader style={{ width: 0 }} />
            </tr>
          </TableHead>

          <TableBody>
            {facilitiesFilter.length > 0 &&
              facilitiesFilter.map((facility) => {
                const {
                  id,
                  facilityName,
                  address,
                  primaryPhoneNumber
                } = facility;

                return (
                  <TableRow
                    key={id}
                    css={
                      rowsChecked[id]
                        ? { backgroundColor: '$charcoalLight' }
                        : {}
                    }
                  >
                    <TableData
                      css={{ backgroundColor: '$charcoal', cursor: 'auto' }}
                    >
                      <input
                        type='checkbox'
                        checked={!!rowsChecked[id]}
                        onChange={(event) =>
                          handlerRowChecked(id, event.target.checked)
                        }
                        title='Check row'
                      />
                    </TableData>
                    <TableData
                      css={{
                        padding: '$0',
                        borderRadius: '$1'
                      }}
                      onClick={() =>
                        setExpanded((currentExpanded) =>
                          currentExpanded !== id ? id : ''
                        )
                      }
                    >
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <TableRowContent
                          css={expanded !== id ? { paddingBottom: 0 } : {}}
                        >
                          <div>
                            <LabelMain>{facilityName}</LabelMain>
                            <LabelDetail>{address}</LabelDetail>
                            <LabelDetail>{primaryPhoneNumber}</LabelDetail>
                          </div>

                          <ActionsWrapper>
                            {facility.nssfMember && (
                              <NSSFWrapper>
                                {Array(facility.nssfRating)
                                  .fill(0)
                                  .map((_, i) => (
                                    <StarFilledIcon
                                      color='#50e5c3'
                                      key={i.toString()}
                                    />
                                  ))}
                                <NSSFLabel>NSSF</NSSFLabel>
                              </NSSFWrapper>
                            )}

                            <div>
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
                                  setShowDeleteDialog(true);
                                }}
                              >
                                <TrashCanIcon />
                              </ActionButton>
                            </div>
                          </ActionsWrapper>
                        </TableRowContent>
                        {expanded !== id && (
                          <ExpandRowWrapper>
                            <ActionButton
                              css={{
                                padding: 0,
                                '&:hover': {
                                  backgroundColor: '$charcoalMedium'
                                }
                              }}
                            >
                              <ChevronDownIcon />
                            </ActionButton>
                          </ExpandRowWrapper>
                        )}
                      </div>
                      {expanded === id && (
                        <DetailRow
                          row={facility}
                          setSelectedContent={setSelectedContent}
                          setShowDetailDialog={setShowDetailDialog}
                        />
                      )}
                    </TableData>
                    <TableData />
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </PageContent>
      <AlertDialog
        open={showDeleteDialog}
        title={`Are you sure you want to delete ${
          selectedFacility ? 'this Facility?' : 'these Facilities?'
        }`}
        titleColor='danger'
        description='Once the data is deleted it cannot be recovered'
        color='danger'
        icon={<TrashCircleIcon fill='#F83f3f' />}
        onCancel={() => {
          setShowDeleteDialog(false);
          setSelectedFacility('');
        }}
        onAccept={() => {
          setShowDeleteDialog(false);
          setSelectedFacility('');
          if (selectedFacility) {
            deleteFacility(selectedFacility);
          } else if (Object.keys(rowsChecked).length > 0) {
            handleRemoveRows();
          }
        }}
        acceptText='Delete'
      />
      <InfoDialog
        open={showDetailDialog}
        title={getDetailTitle(selectedContent)}
        content={getDetailContent(selectedContent)}
        color='danger'
        onClose={() => {
          setShowDetailDialog(false);
          setSelectedContent({
            id: '',
            contentType: ''
          });
        }}
      />
    </>
  );
};
