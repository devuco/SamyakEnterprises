import Credentials from 'react-native-secure-api';

const BaseUrl = async () => {
  const URL = await Credentials.get('BASE_URL');
  return URL;
};

export default BaseUrl;
