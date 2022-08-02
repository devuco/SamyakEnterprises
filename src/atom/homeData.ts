import {atom} from 'recoil';

const homeData = atom<Array<IProducts>>({
  key: 'homeData',
  default: [],
});

export default homeData;
