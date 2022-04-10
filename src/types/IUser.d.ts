export default interface IUser {
  success: boolean;
  data: IData;
  message: string;
}

interface IData {
  _id?: string;
  name?: string;
  password: string;
  email: string;
}
