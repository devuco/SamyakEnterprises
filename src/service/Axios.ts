import axios from 'axios';
import Singleton from '../utils/Singleton';
console.log(Singleton.token);

export default axios.create({
  baseURL: Singleton.BASE_URL,
});
