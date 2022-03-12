import {Appearance} from 'react-native';

const colorScheme = Appearance.getColorScheme();
const isDarkMode = colorScheme === 'light';
const Colors = {
  PRIMARY: '#f26b27',
  SECONDARY: '#fcf0e7',
  THEME_PRIMARY: isDarkMode ? '#202020' : '#ffffff',
  THEME_SECONDARY: isDarkMode ? '#808080' : '#f8f8f8',
  THEME_TEXT: isDarkMode ? '#f8f8f8' : '#111111',
};
export default Colors;
export {isDarkMode};
