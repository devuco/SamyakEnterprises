import {atom} from 'recoil';
export const cartAtom = atom<Array<ICartProduct>>({
  key: 'cart',
  default: [],
});

export const netTotalAtom = atom<number>({
  key: 'netTotal',
  default: 0,
});
