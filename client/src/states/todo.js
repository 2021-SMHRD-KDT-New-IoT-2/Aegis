import { atom } from 'recoil';

export const todoState = atom({
  key: 'todoState',
  default: {},
});

export const todosState = atom({
  key: 'todosState',
  default: [],
});

export const postState = atom({
  key: 'postState',
  default: {},
});
