import ICategories from '../types/ICategories';
import ICompanies from '../types/ICompanies';
import IProducts, {IResponse} from '../types/IProducts';
import IToken from '../types/IToken';
import Axios from './Axios';

export class Api {
  public static getToken = () => {
    return Axios.get<IToken>('token', {headers: {deviceId: '1234'}});
  };
  public static getCategories = () => {
    return Axios.get<Array<ICategories>>('categories');
  };
  public static getCompanies = async () => {
    return Axios.get<Array<ICompanies>>('company');
  };
  public static getProducts = () => {
    return Axios.get<IResponse>('products');
  };
}
