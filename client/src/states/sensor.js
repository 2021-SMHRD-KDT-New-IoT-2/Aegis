import { atom } from 'recoil';

export const sensorState = atom({
  key: 'sensorState',
  default: [{}],
});

export const sensorsState = atom({
  key: 'sensorsState',
  default: [],
});

export const warningSensorState = atom({
  key: 'warningSensorState',
  default: [],
});

export const dangerSensorState = atom({
  key: 'dangerSensorState',
  default: [],
});

export const normalSensorCountState = atom({
  key: 'normalSensorCountState',
  default: 0,
});

export const warningSensorCountState = atom({
  key: 'warningSensorCountState',
  default: 0,
});

export const dangerSensorCountState = atom({
  key: 'dangerSensorCountState',
  default: 0,
});
