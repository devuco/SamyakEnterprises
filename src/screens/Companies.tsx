import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ParentView from '../components/ParentView';
import {Colors, isDarkMode, Singleton} from '../utils';
import HomeToolbar from '../components/HomeToolbar';
import Api from '../service/Api';
import {useRecoilState} from 'recoil';
import {companies} from '../atom';

const Companies = () => {
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useRecoilState<Array<ICompanies>>(companies);
  const [emptyData, setEmptyData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!emptyData) {
      Api.getCompanies(page)
        .then(res => {
          setData(prev => prev.concat(res.data.data));
          if (res.data.data.length === 0) {
            setEmptyData(true);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [emptyData, page, setData]);

  return (
    <ParentView isLoading={isLoading}>
      <HomeToolbar route={'COMPANIES'} />
      <FlatList
        data={data}
        numColumns={2}
        style={styles.flatlist}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Image
              source={
                imageLoaded
                  ? {uri: Singleton.BASE_URL + item.image}
                  : require('../assets/logo.png')
              }
              style={styles.itemImage}
              onLoadEnd={() => setImageLoaded(true)}
            />
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
        onEndReached={() => setPage(prev => prev + 1)}
      />
    </ParentView>
  );
};

export default Companies;

const styles = StyleSheet.create({
  flatlist: {marginHorizontal: 10},
  itemContainer: {
    backgroundColor: isDarkMode ? Colors.SECONDARY : Colors.WHITE,
    elevation: 5,
    margin: 5,
    borderRadius: 8,
    alignItems: 'center',
    width: Dimensions.get('window').width / 2 - 20,
    overflow: 'hidden',
    borderColor: Colors.SHADOW,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  itemImage: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  itemText: {
    color: Colors.THEME_TEXT,
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 8,
    backgroundColor: isDarkMode ? Colors.THEME_PRIMARY : Colors.SECONDARY,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
});
