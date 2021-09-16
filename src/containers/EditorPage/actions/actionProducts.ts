import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getProducts = createAsyncAction(['@Products/getProductsRequest', '@Products/getProductsSuccess', '@Products/getProductsFailure'])<
  { search: string; isLoadmore: boolean },
  any,
  undefined
>();

export const useGetProducts = createDispatchAsyncAction(getProducts);
