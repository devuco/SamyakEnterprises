export const DEV = false;

type Props = {
  BASE_URL: string;
  NAME: string | null;
  EMAIL: string | null;
  FETCH_WISHLIST: boolean;
  FETCH_CART: boolean;
  FETCH_ORDERS: boolean;
  FETCH_PRODUCT: boolean;
  FETCH_HOME: boolean;
  FETCH_ALL_PRODUCTS: prevScreen | '' | 'null';
};
const Singleton: Props = {
  BASE_URL: DEV
    ? 'http://172.16.3.134:3000/'
    : 'https://samyak-app-server.herokuapp.com/',
  NAME: '' || null,
  EMAIL: '',
  FETCH_WISHLIST: true,
  FETCH_CART: true,
  FETCH_ORDERS: true,
  FETCH_PRODUCT: true,
  FETCH_HOME: true,
  FETCH_ALL_PRODUCTS: '',
};

export default Singleton;
