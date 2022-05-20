import {StyleSheet, Text, TextStyle, ActivityIndicator} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';

type Props = {
  title: string;
  style?: TextStyle;
  onPress?: () => void;
  isLoading?: boolean;
  loadingText?: string;
};

const SButton: React.FC<Props> = ({
  title,
  style,
  onPress,
  isLoading,
  loadingText,
}) => {
  return (
    <Text style={[styles.button, style]} onPress={onPress}>
      {isLoading ? loadingText : title}
    </Text>
  );
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
