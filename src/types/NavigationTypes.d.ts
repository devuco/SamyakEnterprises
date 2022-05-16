type StackParamList = {
  SplashScreen: undefined;
  Drawer?: DrawerParamList;
  Login: undefined;
  ProductDetails: {id?: string; bgColor?: string};
  CategoryDetails: {id?: string; bgColor?: string};
  CompanyDetails: {id?: string; bgColor?: string};
};

type DrawerParamList = {
  Tabs: TabsParamList;
};

type TabsParamList = {
  Home: {icon: 'home'};
  Categories: {icon: 'category'};
  Whishlist: {icon: 'bookmark'};
  Service: {icon: 'handyman'};
};
