import {atom} from 'recoil';

const productsData = atom<Array<IProducts>>({
  key: 'products',
  default: [],
});

export default productsData;
