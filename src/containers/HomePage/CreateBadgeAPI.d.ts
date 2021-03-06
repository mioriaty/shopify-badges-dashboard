export interface Params {
  id: string; // Id này là v4 hay bất cứ thứ gì
  badge_id: string;
  slug: string[];
  config: string;
  productIds: string[];
}

export interface ResponseError {
  message: string;
  code: number;
}

interface DataResponseSuccess {
  id: string;
  slug: string;
  date?: string;
}

export interface ResponseSuccess {
  data: {
    items: DataResponseSuccess[];
  };
  status: string;
  message: string;
}
