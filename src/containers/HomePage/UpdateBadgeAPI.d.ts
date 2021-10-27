export interface Params {
  id: string[];
  badge_id: string;
  slug: string[];
  config: string;
}

export interface ResponseError {
  message: string;
  code: number;
}

interface DataResponseSuccess {
  id: string
  slug: string
  date: string
}

export interface ResponseSuccess {
  data: {
    items: DataResponseSuccess[]
  };
  status: string;
  message: string;
}
