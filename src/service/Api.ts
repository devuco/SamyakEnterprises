// import {Toast} from '../utils';
import Axios from './Axios';

Axios.interceptors.response.use(
  response => response,
  error => {
    console.log('error', error.response.data);
    return Promise.reject(error);
  },
);
const Api = {
  login: (body: Partial<IUser>) => Axios.post<IResponse<IUser>>('login', body),

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

  updateAddress: (body: IUserAddress) =>
    Axios.put<IResponse<IUserAddress>>('/checkout/address', body),

  getAddress: () => Axios.get<IResponse<IUserAddress>>('/checkout/address'),

  createOrder: (amount: number) =>
    Axios.post<IResponse<{id: string}>>('/checkout/order/create', {amount}),

  placeOrder: (body: {orderId: string; amount: number}) =>
    Axios.post<IResponse<{message: string}>>('/checkout/order/place', body),
};

export default Api;
