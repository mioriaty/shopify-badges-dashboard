export interface ResponseError {
  message: string;
  code: number;
}

export interface ResponseSuccess {
  data: Data;
  message: string;
  status: string;
}

export interface Data {
  items: Items[];
}

export interface Items {
  id: string;
  config?: Config;
  badge_id: string;
  urlImage: string;
  title: string;
  postType: string;
  description: string;
  isSelected: boolean;
}

export interface Config {
  placement: string;
  size: number;
  texts: any[];
  animation: string;
}
