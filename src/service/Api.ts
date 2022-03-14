import axios from 'axios';
import ICategories from '../types/ICategories';
import IProducts from '../types/IProducts';
import BaseUrl from './BaseUrl';

export class Api {
  // AxiosInstance = async () =>
  //   axios.create({
  //     baseURL: await BaseUrl(),
  //   });

  public static getCategories = () => {
    return BaseUrl.get<ICategories>('categories/names');
  };
  public static getProducts = async () => {
    return axios.get<Array<IProducts>>((await BaseUrl()) + 'products');
    // return AxiosInstance.get<Array<IProducts>>('/products');
  };
}
