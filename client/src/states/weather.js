import { atom } from 'recoil';

export const weatherState = atom({
  key: 'weatherState',
  default: {
    날씨: '',
    온도: 0,
    습도: 0,
    강수량: 0,
    풍향: 0,
    풍속: 0,
  },
});
