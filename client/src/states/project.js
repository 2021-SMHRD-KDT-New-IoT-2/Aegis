import { atom } from 'recoil';

export const projectState = atom({
  key: 'projectState',
  default: {
    모달: false,
  },
});

export const projectsState = atom({
  key: 'projectsState',
  default: [],
});
