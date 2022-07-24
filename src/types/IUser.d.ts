type IUser = {
  _id: string;
  name: string;
  password: string;
  email: string;
  address: Array<IUserAddress>;
  token: string;
};

type IUserAddress = {
  houseNo?: string;
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
};
