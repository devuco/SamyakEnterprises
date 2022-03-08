import ICategories from '../types/ICategories';
import IProducts from '../types/IProducts';
import AxiosInstance from './AxiosInstance';
// const Api = {
//   getCategories: () => {
//     return AxiosInstance.get<ICategories>('/categories/names');
//   },
//   getProducts: () => {
//     return AxiosInstance.get<Array<IProducts>>('/products');
//   },
// };

export class Api {
  public static getCategories = () => {
    return AxiosInstance.get<ICategories>('/categories/names');
  };
  public static getProducts = () => {
    return AxiosInstance.get<Array<IProducts>>('/products');
  };
}
