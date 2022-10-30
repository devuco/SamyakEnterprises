import {atom} from 'recoil';

export const orderAtom = atom<Array<IOrder>>({
  key: 'orders',
  default: [],
});
