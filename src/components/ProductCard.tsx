import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, Singleton} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  item: ICartProduct;
  onAddProduct?: () => void;
  onSubtractProduct?: () => void;
  canUpdateQuantity: boolean;
};

const ProductCard: React.FC<Props> = ({
  item,
  onAddProduct,
  onSubtractProduct,
  canUpdateQuantity,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.push('ProductDetails', {
          id: item.product._id,
        })
      }
      disabled={canUpdateQuantity}>
      <Image
        source={{uri: Singleton.BASE_URL + item.product.image}}
        style={[styles.itemImage, {backgroundColor: item.product.color}]}
      />

      {/* Column 2 contains name price discount and viewText */}
      <View style={styles.itemColumn2}>
        <Text style={styles.itemName}>{item.product.name}</Text>
        <View style={styles.itemPriceContainer}>
          <Text style={styles.itemDiscountedPrice}>
            ₹{item.product.discountedPrice}
          </Text>
          <Text style={styles.itemPrice}>₹{item.product.price}</Text>
          <Text style={styles.itemDiscount}>{item.product.discount}%off</Text>
        </View>
        {canUpdateQuantity && (
          <Text
            style={styles.itemViewProduct}
            onPress={() =>
              navigation.push('ProductDetails', {
                id: item.product._id,
              })
            }>
            View Product
          </Text>
        )}
      </View>

      {/* Column 3 contains Quanity Button and Total Text */}
      <View style={styles.itemColumn3}>
        <Text style={styles.itemTotal}>₹{item.total}</Text>
        <View style={styles.itemQuantityContainer}>
          {canUpdateQuantity && (
            <Text onPress={onAddProduct} style={styles.itemQuantityButton}>
              -
            </Text>
          )}
          {!canUpdateQuantity && (
            <Text style={styles.itemQuantity}>{'QTY:'}</Text>
          )}
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
          {canUpdateQuantity && (
            <Text onPress={onSubtractProduct} style={styles.itemQuantityButton}>
              +
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderColor: Colors.THEME_SECONDARY,
    overflow: 'hidden',
    margin: 10,
  },
  itemImage: {
    height: 100,
    width: 100,
    borderRadius: 12,
  },
  itemColumn2: {
    flex: 1,
    marginHorizontal: 8,
    justifyContent: 'space-evenly',
  },
  itemName: {
    color: Colors.THEME_TEXT,
    fontWeight: 'bold',
  },
  itemPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDiscountedPrice: {
    color: Colors.THEME_TEXT,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  itemPrice: {
    color: Colors.DARK_GREY,
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  itemDiscount: {
    color: Colors.DISCOUNT_GREEN,
    marginRight: 5,
    fontWeight: 'bold',
  },
  itemViewProduct: {
    color: Colors.PRIMARY,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  itemColumn3: {
    marginVertical: 5,
    justifyContent: 'space-evenly',
    marginRight: 5,
  },
  itemTotal: {
    color: Colors.THEME_TEXT,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemQuantityContainer: {flexDirection: 'row'},
  itemQuantityButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    height: 20,
    width: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    overflow: 'hidden',
  },
  itemQuantity: {
    color: Colors.THEME_TEXT,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
});
