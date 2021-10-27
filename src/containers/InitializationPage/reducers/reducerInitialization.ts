import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { getWordpressInfo, initialization } from '../actions/actionInitializationPage';

interface State {
  statusInitialization: Status;
  app?: any;
  shopDomain?: string;
  themeId?: number;
  clientSite?: string;
  email?: string;
  endpointVerification?: string;
  productName?: string;
  purchaseCode?: string;
  purchaseCodeLink?: string;
  tidioId?: string;
  token?: string;
  url?: string;
  youtubePreviewUrl?: string;
}

type Actions = ActionTypes<typeof initialization | typeof getWordpressInfo>;

const defaultState: State = {
  statusInitialization: 'idle',
  app: undefined,
  shopDomain: undefined,
  clientSite: '',
  email: '',
  endpointVerification: '',
  productName: '',
  purchaseCode: '',
  purchaseCodeLink: '',
  tidioId: '',
  token: '',
  url: '',
  youtubePreviewUrl: '',
};

export const reducerInitialization = createReducer<State, Actions>(defaultState, [
  handleAction('@InitializationPage/initializationRequest', ({ state, action }) => {
    const { app } = action.payload;
    return {
      ...state,
      statusInitialization: 'loading',
      app,
    };
  }),
  handleAction('@InitializationPage/initializationSucess', ({ state, action }) => {
    const { app, shopDomain, themeId } = action.payload;
    return {
      ...state,
      statusInitialization: 'success',
      app,
      shopDomain,
      themeId,
    };
  }),
  handleAction('@InitializationPage/initializationFailure', ({ state }) => {
    return {
      ...state,
      statusInitialization: 'failure',
    };
  }),
  handleAction('@InitPage/wordpressInfo', ({ state, action }) => {
    const {
      clientSite,
      email,
      endpointVerification,
      productName,
      purchaseCode,
      purchaseCodeLink,
      tidioId,
      token,
      url,
      youtubePreviewUrl,
    } = action.payload;
    return {
      ...state,
      clientSite,
      email,
      endpointVerification,
      productName,
      purchaseCode,
      purchaseCodeLink,
      tidioId,
      token,
      url,
      youtubePreviewUrl,
    };
  }),
]);
