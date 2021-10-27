export interface ResponseError {
  message: string;
  code: number;
}

export interface ResponseSuccess {
  data: Data;
  message: string;
  status: string;
  code: number;
}

export interface Data {
  id: string;
  date: string;
}

export interface Params {
  postType: string;
  badge_id: string;
  title: string;
  description: string;
  config: string;
}
