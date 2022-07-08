import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {Colors} from '../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  leftText?: string;
  rightText?: string;
  onPress: () => void;
  style?: ViewStyle;
}
const SNextButton: React.FC<Props> = ({
  leftText,
  rightText,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.bottomContainer, style]}
      onPress={onPress}>
      <Text style={styles.leftText}>{leftText}</Text>
      <Text style={styles.rightText}>{rightText}</Text>
      <Icon name="arrow-forward-ios" size={20} color={Colors.THEME_PRIMARY} />
    </TouchableOpacity>
  );
};

export default SNextButton;

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.PRIMARY,
    marginHorizontal: 15,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 14,
  },
  leftText: {
    color: Colors.THEME_PRIMARY,
    fontWeight: '700',
    fontSize: 16,
    padding: 8,
    flex: 1,
  },
  rightText: {
    color: Colors.THEME_PRIMARY,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
});
