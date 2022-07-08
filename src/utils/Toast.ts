import {ToastAndroid} from 'react-native';

export default {
  showSuccess: (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  },

  showError: (message?: string) => {
    ToastAndroid.show(message || 'Something went wrong', ToastAndroid.SHORT);
  },
};
