import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { WordpressProduct } from '../ProductAPI';

export const getFullProducts = createAsyncAction([
  '@FullProducts/getFullProductsRequest',
  '@FullProducts/getFullProductsSuccess',
  '@FullProducts/getFullProductsFailure',
  '@FullProducts/getFullProductsCancel',
])<undefined, { products: WordpressProduct[]; hasNextPage: boolean; lastCursor: string; maxPages: number }, undefined>();

export const loadmoreFullProducts = createAsyncAction([
  '@FullProducts/loadmoreFullProductsRequest',
  '@FullProducts/loadmoreFullProductsSuccess',
  '@FullProducts/loadmoreFullProductsFailure',
  '@FullProducts/loadmoreFullProductsCancel',
])<undefined, { products: WordpressProduct[]; hasNextPage: boolean; lastCursor: string; maxPages: number }, undefined>();

export const changeActiveKey = createAction('@FullProducts/changeActiveKey', (payload: string) => payload);

export const useGetFullProducts = createDispatchAsyncAction(getFullProducts);
export const useLoadmoreFullProducts = createDispatchAsyncAction(loadmoreFullProducts);
export const useChangeActiveKey = createDispatchAction(changeActiveKey);
