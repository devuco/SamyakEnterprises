import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';

const HomeToolbar = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 20,
      }}>
      <Icon
        name="api"
        size={25}
        color={Colors.THEME_TEXT}
        style={{
          backgroundColor: Colors.THEME_SECONDARY,
          borderRadius: 10,
          padding: 5,
        }}
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      <Icon
        name="search"
        size={25}
        color={Colors.THEME_TEXT}
        style={{
          backgroundColor: Colors.THEME_SECONDARY,
          borderRadius: 10,
          padding: 5,
        }}
      />
    </View>
  );
};

export default HomeToolbar;

const styles = StyleSheet.create({});
