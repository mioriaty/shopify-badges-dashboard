import { call, put, retry, takeLatest } from '@redux-saga/core/effects';
import { notification } from 'antd';
import axios, { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { actionPopupPurchaseCode, actionVerifyPurchaseCode } from '../actions/actionLogin';

interface LoginPageSuccess {
  data: {
    isVerifications: boolean;
    plan: string;
  };
  code: number;
  message: string;
  status: string;
}

function* handleLogin({ payload }: ReturnType<typeof actionVerifyPurchaseCode.request>) {
  try {
    const { clientSite, email, purchaseCode, productName } = payload;
    const res: AxiosResponse<LoginPageSuccess> = yield retry(3, 1000, axios.request, {
      url: 'https://wookit.myshopkit.app/wp-json/ev/v1/verifications',
      method: 'post',
      headers: {
        authorization: '',
      },
      data: {
        clientSite,
        purchaseCode,
        email,
        productName,
      },
    });
    if (res.data.status === 'success') {
      yield put(actionPopupPurchaseCode(false));
      yield put(
        actionVerifyPurchaseCode.success({
          messageResponse: res.data.message,
          isVerifications: res.data.data.isVerifications,
          statusResponse: res.data.status,
        }),
      );
      postmessage.emit('@Navigation/UpdatePurchaseCode', { purchaseCode: res.data.data.plan });
      notification.success({
        message: 'Congrats, you have unlocked the Premium!',
      });
      yield call(fetchAPI.request, {
        method: 'post',
        url: 'purchase-code',
        data: {
          purchase_code: purchaseCode,
        },
      });
    }
    if (res.data.status === 'error') {
      yield put(actionVerifyPurchaseCode.failure({ message: res.data.message }));
    }
  } catch (error) {
    const _err = error as Error;
    yield put(actionVerifyPurchaseCode.failure({ message: _err.message }));
  }
}

export function* watchVerifyPurchaseCode() {
  yield takeLatest(getActionType(actionVerifyPurchaseCode.request), handleLogin);
}
