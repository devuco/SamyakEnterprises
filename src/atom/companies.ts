import {atom} from 'recoil';

const companies = atom<Array<ICompanies>>({
  key: 'companies',
  default: [],
});

export default companies;
