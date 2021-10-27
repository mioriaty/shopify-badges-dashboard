export interface Params {
  limit: number;
  page: number;
  s: string;
  pluck?: string;
  taxSlugs?: string;
  taxName?: string;
}

export interface ResponseError {
  message: string;
  code: number;
}

export interface ResponseSuccess {
  data: {
    items: Data[];
    maxPage: number;
  };
  message: string;
  status: string;
}

export interface Data {
  id: string;
  UrlImage: string;
}
