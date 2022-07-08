import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../utils';

type Props = {
  isVisible: boolean;
  onCancel: () => void;
  onRetry: () => void;
};
const NetworkModal: React.FC<Props> = ({isVisible, onCancel, onRetry}) => {
  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.parent}>
        <View style={styles.container}>
          <Icon name="signal-wifi-off" size={50} color={Colors.PRIMARY} />
          <Text style={styles.heading}>No Internet Connection</Text>
          <Text style={styles.subHeading}>
            Please check your internet connection
          </Text>
          <View style={styles.buttonRow}>
            <Button text="Cancel" onPress={onCancel} />
            <Button text="Retry" onPress={onRetry} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

type ButtonProps = {
  text: string;
  onPress: () => void;
};
const Button: React.FC<ButtonProps> = ({text, onPress}) => {
  return (
    <Text onPress={onPress} style={styles.button}>
      {text}
    </Text>
  );
};

export default NetworkModal;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: Colors.THEME_PRIMARY,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    marginTop: 10,
    color: Colors.THEME_TEXT,
    fontWeight: 'bold',
  },
  subHeading: {fontSize: 15, marginTop: 10, color: Colors.THEME_TEXT},
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '80%',
  },
  button: {
    color: Colors.PRIMARY,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
