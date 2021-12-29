import { atom } from 'recoil';

export const workerState = atom({
  key: 'workerState',
  default: [],
});

export const countMacState = atom({
  key: 'countMacState',
  default: [{}],
});
