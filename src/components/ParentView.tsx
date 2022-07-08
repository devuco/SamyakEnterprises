import {StyleSheet, View} from 'react-native';
import React from 'react';
import Loader from './Loader';
import {Colors} from '../utils';

type Props = {
  children: React.ReactNode;
  isLoading: boolean;
};
const ParentView: React.FC<Props> = ({children, isLoading}) => {
  return (
    <View style={styles.parent}>
      {!isLoading && children}
      <Loader isLoading={isLoading} backgroundColor={Colors.THEME_PRIMARY} />
    </View>
  );
};

export default ParentView;

const styles = StyleSheet.create({
  parent: {flex: 1},
});
