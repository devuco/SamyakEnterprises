import Singleton from './Singleton';

const utils = {
  updateHearts: () => {
    Singleton.FETCH_HOME = true;
    Singleton.FETCH_WISHLIST = true;
    Singleton.FETCH_PRODUCT = true;
    Singleton.FETCH_ALL_PRODUCTS = '';
  },
};

export default utils;
