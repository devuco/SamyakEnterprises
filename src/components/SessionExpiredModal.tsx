import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../utils';
import SButton from './SButton';

type Props = {
  onPress: () => void;
  isVisible: boolean;
};
const SessionExpiredModal: React.FC<Props> = ({onPress, isVisible}) => {
  return (
    <Modal transparent visible={isVisible}>
      <View style={styles.parent}>
        <View style={styles.container}>
          <Text style={[styles.text, styles.heading]}>Session Expired</Text>
          <Text style={styles.text}>Please login again</Text>
          <SButton title={'Ok'} onPress={onPress} style={styles.button} />
        </View>
      </View>
    </Modal>
  );
};

export default SessionExpiredModal;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.TRANSLUCENT_GREY,
  },
  container: {
    backgroundColor: Colors.THEME_PRIMARY,
    borderRadius: 10,
    width: '80%',
    paddingTop: 20,
  },
  heading: {fontWeight: 'bold', fontSize: 20},
  text: {
    fontSize: 18,
    marginHorizontal: 20,
    color: Colors.THEME_TEXT,
    marginBottom: 10,
  },
  button: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },
});
