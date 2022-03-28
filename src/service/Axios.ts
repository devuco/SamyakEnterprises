import axios from 'axios';
import Singleton from '../utils/Singleton';

export default axios.create({
  baseURL: Singleton.BASE_URL,
});
