interface IProducts {
  id?: string;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  bgColor?: string | undefined;
  discount?: number | undefined;
  avgRating: number;
  company: string;
  totalRatings: number;
  stock: number;
}

interface IResponse {
  success: boolean;
  data: Array<IProducts>;
}

export {IResponse, IProducts};
