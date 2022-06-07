type IOrder = {
  _id?: string;
  orderId?: string;
  userId?: string;
  orderDate?: Date;
  products?: Array<ICartProduct>;
  netTotal?: number;
};
