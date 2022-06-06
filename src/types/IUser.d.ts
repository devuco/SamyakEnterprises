type IUser = {
  _id: string;
  name: string;
  password: string;
  email: string;
  address: IUserAddress;
};

type IUserAddress = {
  houseNo?: string;
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
};
