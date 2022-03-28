import {ICategories, ICompanies, IResponse, IToken} from '../types';
import Axios from './Axios';

export class Api {
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
}
