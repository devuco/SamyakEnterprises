import {atom} from 'recoil';
export default atom<Array<ICartProduct>>({
  key: 'cart',
  default: [],
});
