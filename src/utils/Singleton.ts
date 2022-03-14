import Credentials from 'react-native-secure-api';
export default class Singleton {
  static BASE_URL = 'http://172.16.3.134:3000/';

  //   static async setBaseURL(a) {
  //     const URL = await Credentials.get('BASE_URL');
  //     console.log('set', a);

  //     this.BASE_URL = URL;
  //   }
  static getBaseURL() {
    console.log('get', this.BASE_URL);
    return this.BASE_URL;
  }
}
