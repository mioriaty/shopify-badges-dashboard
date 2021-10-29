export interface Params {
  limit: number;
  cursor?: string;
  s: string;
  status: 'active' | 'deactive' | 'any';
  pluck: string;
  page: number;
}

export interface ResponseError {
  message: string;
  code: number;
}

export interface ResponseSuccess {
  message: string;
  status: string;
  data: {
    items: WordpressProduct[];
    hasNextPage: boolean;
    maxPages: number;
  };
}

export interface WordpressProduct {
  id: string;
  title: string;
  image: FeaturedImage;
  link: string;
  manual: {
    id: string;
    badge_id: string;
    urlImage: string;
    config: unknown;
  };
  price: string[];
  isSelected: boolean;
}

export interface Data {
  id: string;
  title: string;
  createdAt: string;
  priceRangeV2: PriceRangeV2;
  featuredImage: FeaturedImage;
  handle: string;
  manual: any | [];
  isSelected: boolean;
  cursor: string;
}

export interface PriceRangeV2 {
  maxVariantPrice: MaxVariantPrice;
  minVariantPrice: MinVariantPrice;
}

export interface MaxVariantPrice {
  amount: string;
}

export interface MinVariantPrice {
  amount: string;
}

export interface FeaturedImage {
  height: number;
  src: string;
  width: number;
}
