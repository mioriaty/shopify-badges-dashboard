import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetPurchaseCode } from '../actions/actionLogin';

interface LoginPageSuccess {
  data: {
    isVerifications: boolean;
  };
  code: number;
  message: string;
  status: string;
}

function* handleLogin(_: ReturnType<typeof actionGetPurchaseCode.request>) {
  try {
    const res: AxiosResponse<LoginPageSuccess> = yield retry(3, 1000, fetchAPI.request, {
      url: 'purchase-code',
      baseURL: '',
      method: 'get',
    });
    if (res.data.status === 'success') {
      yield put(
        actionGetPurchaseCode.success({
          messageResponse: res.data.message,
          isVerifications: res.data.data.isVerifications,
          statusResponse: res.data.status,
        }),
      );
    }
    if (res.data.status === 'error') {
      yield put(actionGetPurchaseCode.failure({ message: res.data.message }));
    }
  } catch (error) {
    const _err = error as Error;
    yield put(actionGetPurchaseCode.failure({ message: _err.message }));
  }
}

export function* watchGetPurchaseCode() {
  yield takeLatest(getActionType(actionGetPurchaseCode.request), handleLogin);
}
