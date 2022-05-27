type ICart = {
  _id?: string;
  userId?: string;
  products: Array<ICartProduct>;
};

type ICartProduct = {
  _id;
  product: IProducts;
  quantity: number;
  total: number;
};
