import { useCRUD } from '@modules/common/hooks';

export interface Device {
  id: string;
  zoneID: string;
  name: string;
  code: string;
  type: string;
  softwareVersion: string;
  createdAt: number;
  updatedAt: number;
}

type useDevicesStateHook = () => {
  devices: Device[];
  get: (id: string) => Device;
  add: (device: Device) => void;
  update: (device: Device, deviceId: string) => void;
  delete: (deviceId: string) => void;
};

const initialData: Device[] = [
  {
    id: 'cdba2ced-b837-4ccd-9b19-30f3ca191630',
    zoneID: 'cb14f56f-54b2-432a-a6e8-0000f9ea8c6b',
    name: 'Test Device',
    code: '1234',
    type: 'test',
    softwareVersion: '0.0.1',

    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

export const useDevicesState: useDevicesStateHook = () => {
  const { state, add, update, delete: remove } = useCRUD(
    initialData,
    'devices'
  );

  return {
    devices: state,
    get: (id) => state.find((item: Device) => item.id === id),
    add: (zone) => add(zone),
    update: (zone, zoneId) => update(zone, zoneId),
    delete: (zoneId) => remove(zoneId)
  };
};
