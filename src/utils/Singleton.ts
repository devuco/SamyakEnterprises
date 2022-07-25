type Props = {
  BASE_URL: string;
  NAME: string | null;
  EMAIL: string | null;
};
const Singleton: Props = {
  BASE_URL: 'http://172.16.3.134:3000/',
  NAME: '' || null,
  EMAIL: '',
};

export default Singleton;
