import axios from 'axios';
import ICategories from '../types/ICategories';
import ICompanies from '../types/ICompanies';
import IProducts from '../types/IProducts';
import Singleton from '../utils/Singleton';
import BaseUrl from './BaseUrl';

export class Api {
  public static getCategories = () => {
    return BaseUrl.get<ICategories>('categories/names');
  };
  public static getCompanies = async () => {
    return axios.get<Array<ICompanies>>((await BaseUrl()) + 'company');
  };
  public static getProducts = () => {
    return axios.get<Array<IProducts>>(Singleton.getBaseURL() + 'products');
  };
}
