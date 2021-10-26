import { Reducers } from './store/configureStore';

declare global {
  declare type AppState = Reducers;
  declare type RootState = Reducers;
  declare type GetState = () => AppState;
  declare type Connect<TTypeOfMapStateToProps, TTypeOfMapDispatchToProps> = ReturnType<TTypeOfMapStateToProps> & TTypeOfMapDispatchToProps;

  declare type ValueOf<T> = T[keyof T];

  declare type Status = 'idle' | 'loading' | 'success' | 'failure';

  type PageType = 'manual' | 'automatic';

  declare type Placement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'center';

  declare type AnimationType = 'none' | 'bounce' | 'flash' | 'shake' | 'zoomIn' | 'tada' | 'flip';

  declare interface PlacementStyle {
    topLeft?: {
      top: number;
      left: number;
    };
    topRight?: {
      top: number;
      right: number;
    };
    bottomLeft?: {
      bottom: number;
      left: number;
    };
    bottomRight?: {
      bottom: number;
      right: number;
    };
  }

  interface SvgType {
    id: string;
    content: string;
    color: string;
  }

  export interface ClientProduct {
    id: string;
    title: string;
    link: string;
    image: {
      src: string;
      width: number;
      height: number;
    };
    price: string[];
    isSelected: boolean;
    manual: {
      config: BadgeSetting;
      urlImage: string;
      badge_id: string;
      id: string;
    };
  }

  interface ClientAutomatic {
    id: string;
    config?: Config;
    badge_id: string;
    urlImage: string;
    title: string;
    postType: string;
    description: string;
    isSelected: boolean;
    defaultImage?: string;
  }
}
