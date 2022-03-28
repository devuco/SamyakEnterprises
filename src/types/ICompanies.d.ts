export default interface ICompanies {
  success: boolean;
  data: Array<IData>;
}

interface IData {
  name: string;
  image: string;
  _id: string;
}
