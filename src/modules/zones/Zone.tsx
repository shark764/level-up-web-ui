/* eslint-disable radix */
import React, { useState, useRef } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import Konva from 'konva';
import { useAuth } from '@modules/auth';
import { useFacilitiesState } from '@modules/facilities';
import { useForm } from '@modules/common/hooks';
import { Designer } from '@modules/zone-designer';
import {
  ChevronLeftIcon,
  UserMenu,
  TrashIcon,
  AlertDialog
} from '@modules/common/components';
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

export const Zone = () => {
  const history = useHistory();
  const { id } = useParams() as { id: string };

  const { user } = useAuth();
  const { get, update, delete: deleteZone } = useZonesState();
  const { facilities } = useFacilitiesState();
  const zone = get(id);

  // Zone Designer
  // I'm sorry
  const canvasRef = useRef<Konva.Stage>(null);
  const [zoneRows, setZoneRows] = useState(zone?.rows ?? 0);
  const [zoneColumns, setZoneColumns] = useState(zone?.columns ?? 0);
  const [zoneItems, setZoneItems] = useState(
    zone?.diagram || ([] as DesignerItem[])
  );

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { formData, handleInputChange } = useForm({
    facility: zone?.facilityID,
    name: zone?.name
  });

  const updateZone = async () => {
    const { name, facility } = formData;
    if (!name || !facility) {
      return;
    }

    await update(
      {
        ...zone,
        name: name.toString(),
        rows: zoneRows,
        columns: zoneColumns,
        diagram: zoneItems,
        diagramImg: canvasRef.current?.toDataURL({ pixelRatio: 2 }) ?? '',
        updatedAt: Date.now()
      },
      id
    );

    history.push('/zones');
  };

  if (!zone || !zone.id) {
    return <Redirect to='/zones' />;
  }

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
          <Title>Zone Details</Title>
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
            <PageTitle>Zone Details</PageTitle>

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
              <Button color='purple' onClick={updateZone}>
                Save
              </Button>

              <Button color='danger' onClick={() => setShowDeleteDialog(true)}>
                Delete <TrashIcon />
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
      <AlertDialog
        open={showDeleteDialog}
        title='Are you sure you want to delete this Zone'
        description='Once the data is deleted it cannot be recovered'
        color='danger'
        icon={<TrashIcon />}
        onCancel={() => setShowDeleteDialog(false)}
        onAccept={async () => {
          setShowDeleteDialog(false);
          deleteZone(id);
        }}
      />
    </>
  );
};
