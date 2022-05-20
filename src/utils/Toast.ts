import {ToastAndroid} from 'react-native';

const Toast = {
  showSuccess: (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  },

  showError: (message?: string) => {
    ToastAndroid.show(message || 'Something went wrong', ToastAndroid.SHORT);
  },
};

export default Toast;
