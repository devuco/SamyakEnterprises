import {
  ICategories,
  ICompanies,
  IProducts,
  IResponse,
  IToken,
  IUser,
} from '../types';
import ISearch from '../types/ISearch';
import Axios from './Axios';

export class Api {
  public static login = (body: IUser) => {
    return Axios.post<IResponse<IUser>>('users/login', body);
  };
  public static getToken = () => {
    return Axios.get<IToken>('token', {headers: {deviceId: '1234'}});
  };
  public static getCategories = () => {
    return Axios.get<IResponse<Array<ICategories>>>('categories');
  };
  public static getCompanies = () => {
    return Axios.get<IResponse<Array<ICompanies>>>('company');
  };
  public static getProducts = () => {
    return Axios.get<IResponse<Array<IProducts>>>('products');
  };
  public static getProduct = (id: string) => {
    return Axios.get<IResponse<IProducts>>(`products/${id}`);
  };
  public static searchProducts = (searchInput: string) => {
    return Axios.get<ISearch>(`products/search/${searchInput}`);
  };
  public static addToCart = (body: ICart) => {
    return Axios.post<IResponse<any>>('/cart', body);
  };
}
