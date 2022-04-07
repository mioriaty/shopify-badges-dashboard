import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetPurchaseCode } from '../actions/actionLogin';

interface LoginPageSuccess {
  data: {
    hasPurchaseCode: boolean;
    purchaseCode: string;
  };
  code: number;
  message: string;
  status: string;
}

function* handleLogin({ payload }: ReturnType<typeof actionGetPurchaseCode.request>) {
  const { clientSite, email, productName, purchaseCode } = payload;
  try {
    const res: AxiosResponse<LoginPageSuccess> = yield retry(3, 1000, fetchAPI.request, {
      url: 'purchase-code',
      baseURL: '',
      method: 'get',
    });

    const _responseData = res.data;

    yield put(
      actionGetPurchaseCode.success({
        messageResponse: _responseData.message,
        hasPurchaseCode: _responseData.data.hasPurchaseCode,
        statusResponse: _responseData.status,
      }),
    );

    if (_responseData.data.hasPurchaseCode === false) {
      yield retry(3, 1000, fetchAPI.request, {
        url: 'purchase-code',
        baseURL: '',
        method: 'post',
        data: {
          clientSite,
          email,
          productName,
          purchaseCode: purchaseCode ? purchaseCode : 'free',
        },
      });
    }
  } catch (error) {
    const _err = error as Error;
    yield put(actionGetPurchaseCode.failure({ message: _err.message }));
  }
}

export function* watchGetPurchaseCode() {
  yield takeLatest(getActionType(actionGetPurchaseCode.request), handleLogin);
}
