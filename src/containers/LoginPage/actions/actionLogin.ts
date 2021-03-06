import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const actionValidateApp = createAsyncAction([
  '@Auth/actionValidateAppRequest',
  '@Auth/actionValidateAppSuccess',
  '@Auth/actionValidateAppFailure',
])<{ username: string; password: string; url: string }, { username: string; password: string; hasPassed: boolean }, { message: string }>();

export const actionConfirmValidate = createAction('@Auth/actionConfirmValidate', (hasPassed: boolean) => ({ hasPassed }));

export const actionVerifyPurchaseCode = createAsyncAction([
  '@Auth/verifyPurchaseCodeRequest',
  '@Auth/verifyPurchaseCodeSuccess',
  '@Auth/verifyPurchaseCodeFailure',
])<
  { clientSite: string; purchaseCode: string; email: string; productName?: string },
  { isVerifications: boolean; statusResponse: string; messageResponse: string },
  { message: string }
>();

export const actionGetPurchaseCode = createAsyncAction([
  '@Auth/GetPurchaseCodeRequest',
  '@Auth/GetPurchaseCodeSuccess',
  '@Auth/GetPurchaseCodeFailure',
])<
  { clientSite: string; purchaseCode: string; email: string; productName: string },
  { hasPurchaseCode: boolean; statusResponse: string; messageResponse: string },
  { message: string }
>();
export const actionPopupPurchaseCode = createAction('@Auth/actionPopupPurchaseCode', (show: boolean) => ({ show }));
export const setPurchaseCode = createAction('@Auth/setPurchaseCode', (purchaseCode: string) => ({ purchaseCode }));

export const useGetPurchaseCode = createDispatchAsyncAction(actionGetPurchaseCode);
export const usePopupPurchaseCode = createDispatchAction(actionPopupPurchaseCode);
export const useActionValidateApp = createDispatchAsyncAction(actionValidateApp);
export const useConfirmValidate = createDispatchAction(actionConfirmValidate);
export const useVerifyPurchaseCode = createDispatchAsyncAction(actionVerifyPurchaseCode);
export const useSetPurchaseCode = createDispatchAction(setPurchaseCode);
