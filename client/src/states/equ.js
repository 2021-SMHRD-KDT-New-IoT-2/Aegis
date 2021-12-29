import { atom } from 'recoil';

export const beaconsState = atom({
  key: 'beaconsState',
  default: [],
});

export const scannersState = atom({
  key: 'scannersState',
  default: [],
});

export const estimatesState = atom({
  key: 'estimatesState',
  default: [],
});

export const beaconState = atom({
  key: 'beaconState',
  default: {
    모달: false,
  },
});

export const scannerState = atom({
  key: 'scannerState',
  default: {
    모달: false,
  },
});

export const estimateState = atom({
  key: 'estimateState',
  default: {
    모달: false,
  },
});
