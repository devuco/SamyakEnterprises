import {Pressable, StyleSheet, Text, TextStyle} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  title: string;
  style?: TextStyle;
  onPress: () => void;
  isLoading?: boolean;
  loadingText?: string;
  iconName?: string;
};

const SButton: React.FC<Props> = ({
  title,
  style,
  onPress,
  isLoading,
  loadingText,
  iconName,
}) => {
  const ICON_MARGIN = iconName ? -10 : 0;
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      {iconName && (
        <Icon
          name={iconName}
          size={30}
          color={Colors.THEME_PRIMARY}
          style={{marginLeft: ICON_MARGIN}}
        />
      )}
      <Text style={styles.text}>{isLoading ? loadingText : title}</Text>
    </Pressable>
  );
};

export default SButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    borderRadius: 14,
  },
  text: {
    color: Colors.THEME_PRIMARY,
    textAlign: 'center',
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
});
