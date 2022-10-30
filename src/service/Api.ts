import Axios from './Axios';

const Api = {
  register: (body: Partial<IUser>) =>
    Axios.post<IResponse<IUser>>('login/register', body),

  login: (body: Partial<IUser>) => Axios.post<IResponse<IUser>>('login', body),

  getCategories: () => Axios.get<IResponse<Array<ICategories>>>('categories'),

  getCompanies: (page?: number) =>
    Axios.get<IResponse<Array<ICompanies>>>(
      `company${page !== undefined ? `?page=${page}` : ''}`,
    ),

  getProducts: (param?: string, id?: string) =>
    Axios.get<IResponse<Array<IProducts>>>(`products?${param}=${id}`),

  getProduct: (id: string) => Axios.get<IResponse<IProducts>>(`products/${id}`),

  searchProducts: (searchInput: string) =>
    Axios.get<ISearch>(`products/search/${searchInput}`),

  addToCart: (body: {product: string}) =>
    Axios.post<IResponse<ICartProduct>>('/cart', body),

  getCart: () => Axios.get<IResponse<ICart>>('/cart'),

  updateCart: (body: {product: string; action: 0 | 1}) =>
    Axios.put<IResponse<ICart>>('/cart', body),

  deleteFromCart: (id: string) =>
    Axios.delete<IResponse<string>>(`/cart/${id}`),

  updateAddress: (body: IUserAddress) =>
    Axios.put<IResponse<IUserAddress>>('/checkout/address', body),

  getAddress: () =>
    Axios.get<IResponse<Array<IUserAddress>>>('/checkout/address'),

  createOrder: (amount: number) =>
    Axios.post<IResponse<{id: string}>>('/checkout/order/create', {amount}),

  placeOrder: (body: {orderId: string; amount: number}) =>
    Axios.post<IResponse<{message: string}>>('/checkout/order/place', body),

  getOrder: (orderId: string) =>
    Axios.get<IResponse<IOrder>>(`/orders/${orderId}`),

  getInvoice: (orderId: string) =>
    Axios.get(`/checkout/order/${orderId}/invoice`),

  getOrders: (page: number) =>
    Axios.get<IResponse<Array<IOrder>>>(`/orders?page=${page}`),

  updateWishList: (productId: string) =>
    Axios.put<IResponse<IWishist>>(`/wishlist?productId=${productId}`),

  getWishlist: () => Axios.get<IResponse<IWishist>>('/wishlist'),
};

export default Api;
