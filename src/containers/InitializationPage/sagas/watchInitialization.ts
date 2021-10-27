import { call, put, takeLatest } from '@redux-saga/core/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { initialization } from '../actions';
import { initialzationService } from '../services';
import { InitializationPageSuccess } from '../services/types';

function* handleInitialization({ payload }: ReturnType<typeof initialization.request>) {
  try {
    const res: InitializationPageSuccess = yield call(initialzationService.initialization, {
      app: payload.app,
      shopDomain: payload.shopDomain,
    });
    yield put(initialization.success({ app: payload.app, shopDomain: res.myshopifyDomain, themeId: res.themeId }));
  } catch (err) {
    console.log(err);
    yield put(initialization.failure(undefined));
  }
}

export function* watchInitialization() {
  yield takeLatest(getActionType(initialization.request), handleInitialization);
}
