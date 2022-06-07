import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, isDarkMode} from '../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Props {
  color: string;
  title: string;
  statusBarColor?: string;
  canGoBack?: boolean;
}
const Toolbar: React.FC<Props> = ({
  color,
  title,
  statusBarColor,
  canGoBack = true,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const TEXT_PADDING = canGoBack ? 10 : 0;
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={statusBarColor || color}
      />
      {canGoBack && (
        <Icon
          name="arrow-back"
          color={Colors.THEME_TEXT}
          size={25}
          onPress={() => navigation.goBack()}
        />
      )}
      <Text style={[styles.title, {paddingHorizontal: TEXT_PADDING}]}>
        {title}
      </Text>
    </View>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    color: Colors.THEME_TEXT,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
