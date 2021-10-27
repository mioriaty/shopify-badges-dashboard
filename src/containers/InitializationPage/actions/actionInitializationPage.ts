import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const initialization = createAsyncAction([
  '@InitializationPage/initializationRequest',
  '@InitializationPage/initializationSucess',
  '@InitializationPage/initializationFailure',
])<
  {
    app: any;
    shopDomain: string;
  },
  {
    app: any;
    shopDomain: string;
    themeId: number;
  },
  undefined
>();

export const useInitialization = createDispatchAsyncAction(initialization);

export const getWordpressInfo = createAction('@InitPage/wordpressInfo', (payload: Partial<WordpressInfo>) => ({ ...payload }));
export const useGetWordpressInfo = createDispatchAction(getWordpressInfo);
