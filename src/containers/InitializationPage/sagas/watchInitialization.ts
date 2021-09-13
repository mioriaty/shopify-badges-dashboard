import { call, put, takeLatest } from '@redux-saga/core/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { initialization } from '../actions';
import { initialzationService } from '../services';

function* handleInitialization(_: ReturnType<typeof initialization.request>) {
  try {
    const res: Record<string, any> = yield call(initialzationService.initialization);
    yield put(initialization.success(res));
  } catch {
    yield put(initialization.failure(undefined));
  }
}

export function* watchInitialization() {
  yield takeLatest(getActionType(initialization.request), handleInitialization);
}
