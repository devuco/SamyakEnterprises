type Props = {
  BASE_URL: string;
  NAME: string | null;
  EMAIL: string | null;
};
const Singleton: Props = {
  BASE_URL: 'http://192.168.1.154:3000/',
  NAME: '' || null,
  EMAIL: '',
};

export default Singleton;
