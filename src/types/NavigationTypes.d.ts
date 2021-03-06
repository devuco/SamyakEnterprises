type StackParamList = {
  SplashScreen: undefined;
  Drawer?: DrawerParamList;
  Login: undefined;
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
  Whishlist: {icon: 'bookmark'};
  Account: {icon: 'person'};
};
