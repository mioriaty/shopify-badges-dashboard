import { Reducers } from 'store/configureStore';

declare global {
  type AppState = Reducers;
  type RootState = Reducers;
  type GetState = () => AppState;
  type Status = 'idle' | 'loading' | 'success' | 'failure';

  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }

  declare interface Window {
    $crisp: any;
    CRISP_WEBSITE_ID: string;
    tidioChatApi: any;
    _APP_: any;
  }

  interface WordpressInfo {
    clientSite: string;
    email: string;
    endpointVerification: string;
    purchaseCode: string;
    purchaseCodeLink: string;
    tidioId: string;
    token: string;
    url: string;
    productName: string;
    youtubePreviewUrl: string;
    currencyFormat: string;
  }
}
