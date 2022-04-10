import {StyleSheet, Text, TextProps, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';

interface Props {
  title: string;
  style?: TextProps;
}

const SButton: React.FC<Props> = ({title, style}) => {
  return <Text style={[styles.button, style]}>{title}</Text>;
};

export default SButton;

const styles = StyleSheet.create({
  button: {
    color: Colors.WHITE,
    backgroundColor: Colors.PRIMARY,
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 20,
    borderRadius: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});
