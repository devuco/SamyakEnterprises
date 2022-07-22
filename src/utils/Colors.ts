import {Appearance} from 'react-native';

const colorScheme = Appearance.getColorScheme();
export const isDarkMode = colorScheme === 'light';
export default {
  PRIMARY: '#f26b27',
  SECONDARY: '#fcf0e7',
  THEME_PRIMARY: isDarkMode ? '#202020' : '#ffffff',
  THEME_SECONDARY: isDarkMode ? '#808080' : '#ededed',
  THEME_TEXT: isDarkMode ? '#c7c7c7' : '#111111',
  STAR_YELLOW: '#ffc827',
  WHITE: '#FFFFFF',
  BLACK: '#202020',
  DARK_GREY: '#808080',
  DISCOUNT_GREEN: '#00b300',
  TRANSLUCENT_GREY: '#00000020',
  RED: '#FF0000',
};
