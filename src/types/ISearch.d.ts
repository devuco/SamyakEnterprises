import ICategories from './ICategories';
import ICompanies from './ICompanies';
import {IProducts} from './IProducts';

export default interface ISearch {
  products: Array<IProducts>;
  categories: Array<ICategories['data'][0]>;
  companies: Array<ICompanies['data'][0]>;
}
