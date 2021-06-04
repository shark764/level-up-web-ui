/* eslint-disable radix */
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Konva from 'konva';
import { useAuth } from '@modules/auth';
import { useFacilitiesState } from '@modules/facilities';
import { Designer } from '@modules/zone-designer';
import { useForm } from '@modules/common/hooks';
import { ChevronLeftIcon, UserMenu } from '@modules/common/components';
import { uuid } from '@modules/common/utils';
import { Header, Title, SubTitle, PageContent, BackButton } from '@styles/page';
import { Button } from '@styles/button';
import { Input as BaseInput } from '@styles/form';
import {
  SplitPane,
  Form,
  Input,
  ReadOnlyInput,
  PageTitle,
  InputGroup,
  DesignerContainer,
  DesignerSizeControls,
  FormActions
} from './styles';
import { useZonesState } from './useZonesState';
import type { DesignerItem } from '@modules/zone-designer/types';

export const Create = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { add } = useZonesState();
  const { facilities } = useFacilitiesState();
  const { formData, handleInputChange } = useForm({
    facility: facilities[0].id,
    name: ''
  });

  // Zone Designer
  const canvasRef = useRef<Konva.Stage>(null);
  const [zoneRows, setZoneRows] = useState(4);
  const [zoneColumns, setZoneColumns] = useState(4);
  const [zoneItems, setZoneItems] = useState([] as DesignerItem[]);

  const createZone = async () => {
    const { name, facility } = formData;
    if (!name || !facility) {
      return;
    }

    await add({
      id: uuid(),
      name: name.toString(),
      facilityID: facility.toString(),
      rows: zoneRows,
      columns: zoneColumns,
      diagram: zoneItems,
      diagramImg: canvasRef.current?.toDataURL({ pixelRatio: 2 }) ?? '',
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    history.push('/zones');
  };

  const lanes = zoneItems
    ? zoneItems.filter((item) => item.type === 'lane').length
    : 0;
  const displays = zoneItems
    ? zoneItems.filter((item) => item.type === 'display').length
    : 0;
  const targets = zoneItems
    ? zoneItems.filter((item) => item.type === 'target').length
    : 0;

  return (
    <>
      <Header>
        <div>
          <Title>Zone Creation</Title>
          <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
        </div>
        <UserMenu />
      </Header>
      <PageContent>
        <BackButton onClick={() => history.goBack()}>
          <ChevronLeftIcon />
          Back
        </BackButton>
        <SplitPane>
          <Form onSubmit={(e) => e.preventDefault()}>
            <PageTitle>Zone Creation</PageTitle>

            <InputGroup>
              <label>Name</label>
              <Input
                required
                name='name'
                type='text'
                value={formData.name.toString()}
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup>
              <label>Facility</label>
              <Input
                as='select'
                name='facility'
                css={{ appearance: 'searchfield' }}
                value={formData.facility.toString()}
                onChange={handleInputChange}
              >
                {facilities.length > 0 &&
                  facilities.map(({ id: fid, facilityName }) => (
                    <option key={fid} value={fid}>
                      {facilityName}
                    </option>
                  ))}
              </Input>
            </InputGroup>
            <InputGroup>
              <label>Size</label>
              <DesignerSizeControls>
                <BaseInput
                  type='number'
                  min={1}
                  max={600}
                  value={zoneColumns}
                  onChange={(e) => setZoneColumns(parseInt(e.target.value))}
                />
                <span>x</span>
                <BaseInput
                  type='number'
                  min={1}
                  max={600}
                  value={zoneRows}
                  onChange={(e) => setZoneRows(parseInt(e.target.value))}
                />
                <span>mts.</span>
              </DesignerSizeControls>
            </InputGroup>

            <InputGroup>
              <label>Shooting Positions</label>
              <ReadOnlyInput value={lanes} disabled />
            </InputGroup>

            <InputGroup>
              <label>Smart Devices</label>
              <ReadOnlyInput value={targets} disabled />
            </InputGroup>

            <InputGroup>
              <label>Smart Displays</label>
              <ReadOnlyInput value={displays} disabled />
            </InputGroup>

            <FormActions>
              <Button color='purple' onClick={createZone}>
                Save
              </Button>
            </FormActions>
          </Form>
          <DesignerContainer>
            <Designer
              ref={canvasRef}
              width={800}
              height={600}
              columns={zoneColumns}
              rows={zoneRows}
              placedItems={zoneItems}
              updatePlacedItems={(newItems) => {
                setZoneItems(newItems);
              }}
            />
          </DesignerContainer>
        </SplitPane>
      </PageContent>
    </>
  );
};
