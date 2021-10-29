import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import {
  actionConfirmValidate,
  actionValidateApp,
  actionPopupPurchaseCode,
  actionVerifyPurchaseCode,
  actionGetPurchaseCode,
} from '../actions/actionLogin';

type LoginAction = ActionTypes<
  | typeof actionValidateApp
  | typeof actionConfirmValidate
  | typeof actionPopupPurchaseCode
  | typeof actionVerifyPurchaseCode
  | typeof actionGetPurchaseCode
>;

interface LoginState {
  loginStatus: Status;
  verificationStatus: Status;
  username: string;
  password: string;
  hasPassed: boolean;
  message: string;
  popupPurchaseCode: boolean;
  isVerifications: boolean;
}

const defaultState: LoginState = {
  loginStatus: 'idle',
  hasPassed: false,
  password: '',
  username: '',
  message: '',
  popupPurchaseCode: false,
  isVerifications: false,
  verificationStatus: 'idle',
};

export const reducerLogin = createReducer<LoginState, LoginAction>(defaultState, [
  handleAction('@Auth/actionValidateAppRequest', ({ state }) => {
    return {
      ...state,
      loginStatus: 'loading',
    };
  }),
  handleAction('@Auth/actionValidateAppSuccess', ({ state, action }) => {
    const { hasPassed, password, username } = action.payload;
    return {
      ...state,
      loginStatus: 'success',
      hasPassed,
      password,
      username,
    };
  }),
  handleAction('@Auth/actionValidateAppFailure', ({ state, action }) => {
    return {
      ...state,
      loginStatus: 'failure',
      message: action.payload.message,
    };
  }),
  handleAction('@Auth/actionConfirmValidate', ({ state, action }) => {
    const { hasPassed } = action.payload;
    return {
      ...state,
      hasPassed,
    };
  }),
  handleAction('@Auth/actionPopupPurchaseCode', ({ state, action }) => {
    const { show } = action.payload;
    return {
      ...state,
      popupPurchaseCode: show,
    };
  }),
  handleAction('@Auth/verifyPurchaseCodeRequest', ({ state }) => {
    return {
      ...state,
      verificationStatus: 'loading',
    };
  }),
  handleAction('@Auth/verifyPurchaseCodeSuccess', ({ state, action }) => {
    return {
      ...state,
      verificationStatus: 'success',
      isVerifications: action.payload.isVerifications,
      message: action.payload.messageResponse,
    };
  }),
  handleAction('@Auth/verifyPurchaseCodeFailure', ({ state, action }) => {
    return {
      ...state,
      verificationStatus: 'failure',
      message: action.payload.message,
    };
  }),
  handleAction('@Auth/GetPurchaseCodeRequest', ({ state }) => {
    return {
      ...state,
      verificationStatus: 'loading',
    };
  }),
  handleAction('@Auth/GetPurchaseCodeSuccess', ({ state, action }) => {
    return {
      ...state,
      verificationStatus: 'success',
      isVerifications: action.payload.isVerifications,
    };
  }),
]);
