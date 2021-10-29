import { watchGetPurchaseCode } from './watchGetPurchaseCode';
import { watchLogin } from './watchLogin';
import { watchVerifyPurchaseCode } from './watchVerifyPurchaseCode';

export const sagasLoginPage = [watchLogin, watchVerifyPurchaseCode, watchGetPurchaseCode];
