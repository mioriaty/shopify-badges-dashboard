import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'wiloke-react-core/utils';
import { actionValidateApp } from '../actions/actionLogin';

interface LoginPageSuccess {
  data: { hasPassed: boolean };
  message: string;
  status: string;
}

function* handleLogin({ payload }: ReturnType<typeof actionValidateApp.request>) {
  try {
    const { password, username, url } = payload;
    const res: AxiosResponse<LoginPageSuccess> = yield retry(3, 1000, fetchAPI.request, {
      url: `${url}auth`,
      method: 'POST',
      data: {
        username,
        appPassword: password,
      },
    });
    if (res.data.status === 'success') {
      yield put(actionValidateApp.success({ username, password, hasPassed: res.data.data.hasPassed }));
    }
    if (res.data.status === 'error') {
      yield put(actionValidateApp.failure({ message: res.data.message }));
    }
  } catch (error) {
    const _err = error as Error;
    yield put(actionValidateApp.failure({ message: _err.message }));
  }
}

export function* watchLogin() {
  yield takeLatest(getActionType(actionValidateApp.request), handleLogin);
}
