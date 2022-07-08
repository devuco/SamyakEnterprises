import Axios from './Axios';

const Api = {
  login: (body: Partial<IUser>) => Axios.post<IResponse<IUser>>('login', body),

  getToken: () => Axios.get<IToken>('token', {headers: {deviceId: '1234'}}),

  getCategories: () => Axios.get<IResponse<Array<ICategories>>>('categories'),

  getCompanies: () => Axios.get<IResponse<Array<ICompanies>>>('company'),

  getProducts: () => Axios.get<IResponse<Array<IProducts>>>('products'),

  getProduct: (id: string) => Axios.get<IResponse<IProducts>>(`products/${id}`),

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

  getOrder: (orderId: string) =>
    Axios.get<IResponse<IOrder>>(`/checkout/order/${orderId}`),

  getInvoice: (orderId: string) =>
    Axios.get(`/checkout/order/${orderId}/invoice`),

  getOrders: () => Axios.get<IResponse<Array<IOrder>>>('/orders'),
};

export default Api;
