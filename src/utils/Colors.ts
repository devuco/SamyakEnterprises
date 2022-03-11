import {Appearance} from 'react-native';

const colorScheme = Appearance.getColorScheme();
const darkMode = colorScheme === 'dark';
const Colors = {
  PRIMARY: '#f26b27',
  SECONDARY: '#fcf0e7',
  THEME_PRIMARY: darkMode ? '#202020' : '#ffffff',
  THEME_SECONDARY: darkMode ? '#808080' : '#f8f8f8',
};
export default Colors;
