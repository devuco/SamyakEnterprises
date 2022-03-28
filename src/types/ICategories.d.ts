export default interface ICategories {
  success: boolean;
  data: Array<IData>;
}

interface IData {
  _id: String;
  name: String;
  image: String;
}
