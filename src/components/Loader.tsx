import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Colors} from '../utils';

interface Props {
  isLoading: boolean;
  backgroundColor?: string;
}
const Loader: React.FC<Props> = ({isLoading, backgroundColor}) =>
  isLoading ? (
    <ActivityIndicator
      size="large"
      color={Colors.PRIMARY}
      style={[
        styles.loader,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : Colors.TRANSLUCENT_GREY,
        },
      ]}
    />
  ) : null;

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#00000020',
  },
});

export default Loader;
