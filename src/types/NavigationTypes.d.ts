type StackParamList = {
  SplashScreen: undefined;
  Drawer?: DrawerParamList;
  Login: undefined;
  OTP: {phone: string};
  Products: {id: string; prevScreen: prevScreen};
  ProductDetails: {id: string};
  CategoryDetails: {id: string};
  CompanyDetails: {id: string};
  Cart: undefined;
  Checkout: {total: number};
  OrderPlaced: {orderId: string};
  MyOrders: undefined;
  OrderedProducts: {orderId: string};
};

type DrawerParamList = {
  Tabs: TabsParamList;
};

type TabsParamList = {
  Home: {icon: 'home'};
  Categories: {icon: 'category'};
  Brands: {icon: 'local-offer'};
  Whishlist: {icon: 'bookmark'};
};

type prevScreen = 'Products' | 'Categories' | 'Companies';
