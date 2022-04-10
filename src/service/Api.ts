import {ICategories, ICompanies, IResponse, IToken, IUser} from '../types';
import ISearch from '../types/ISearch';
import Axios from './Axios';

export class Api {
  public static login = (body: IUser['data']) => {
    return Axios.post<IUser>('users/login', body);
  };
  public static getToken = () => {
    return Axios.get<IToken>('token', {headers: {deviceId: '1234'}});
  };
  public static getCategories = () => {
    return Axios.get<ICategories>('categories');
  };
  public static getCompanies = async () => {
    return Axios.get<ICompanies>('company');
  };
  public static getProducts = () => {
    return Axios.get<IResponse>('products');
  };
  public static searchProducts = (searchInput: string) => {
    console.log('params', searchInput);

    return Axios.get<ISearch>(`products/search/${searchInput}`);
  };
}
