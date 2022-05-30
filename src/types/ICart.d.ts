type ICart = {
  _id?: string;
  userId?: string;
  products: Array<ICartProduct>;
  product?: ICartProduct;
  netTotal: number;
};

type ICartProduct = {
  _id: string;
  product: IProducts;
  quantity: number;
  total: number;
  netTotal: number;
};
