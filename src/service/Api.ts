import {Toast} from '../utils';
import Axios from './Axios';

Axios.interceptors.response.use(
  response => response,
  error => {
    Toast.showError();
    console.log('error', error.response.data);
    return Promise.reject(error);
  },
);
const Api = {
  login: (body: Partial<IUser>) =>
    Axios.post<IResponse<IUser>>('users/login', body),

  getToken: () => Axios.get<IToken>('token', {headers: {deviceId: '1234'}}),

  getCategories: () => Axios.get<IResponse<Array<ICategories>>>('categories'),

  getCompanies: () => Axios.get<IResponse<Array<ICompanies>>>('company'),

  getProducts: () => Axios.get<IResponse<Array<IProducts>>>('products'),

  getProduct: (id: IProducts['_id']) =>
    Axios.get<IResponse<IProducts>>(`products/${id}`),

  searchProducts: (searchInput: string) =>
    Axios.get<ISearch>(`products/search/${searchInput}`),

  addToCart: (body: {product?: string; quantity: number}) =>
    Axios.post<IResponse<ICartProduct>>('/cart', body),

  getCart: () => Axios.get<IResponse<ICart>>('/cart'),

  updateCart: (body: {product?: string; quantity: number}) =>
    Axios.put<IResponse<ICartProduct>>('/cart', body),

  deleteFromCart: (id: string) =>
    Axios.delete<IResponse<string>>(`/cart/${id}`),
};
export default Api;
