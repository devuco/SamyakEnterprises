import ICategories from './ICategories';
import ICompanies from './ICompanies';
import IProducts from './IProducts';

export default interface ISearch {
  products: Array<IProducts>;
  categories: Array<ICategories>;
  companies: Array<ICompanies>;
}
