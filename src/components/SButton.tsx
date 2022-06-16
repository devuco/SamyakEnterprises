import {Pressable, StyleSheet, Text, TextStyle} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';

type Props = {
  title: string;
  style?: TextStyle;
  onPress: () => void;
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
    <Pressable onPress={onPress}>
      <Text style={[styles.button, style]}>
        {isLoading ? loadingText : title}
      </Text>
    </Pressable>
  );
};

export default SButton;

const styles = StyleSheet.create({
  button: {
    color: Colors.THEME_PRIMARY,
    backgroundColor: Colors.PRIMARY,
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 20,
    borderRadius: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '500',
    overflow: 'hidden',
  },
});
