import { AxiosResponse } from 'axios';
import { Task } from 'redux-saga';
import { fork, take, put, retry, select } from 'redux-saga/effects';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { getAutomatics } from '../../actions/actionAutomaticProducts';
import { ResponseError, ResponseSuccess } from '../../AutomaticAPI';

let task: Task | undefined;

function* handleGetAutomatics(_: ReturnType<typeof getAutomatics.request>) {
  try {
    const { automatics, statusRequest }: AppState['automatics'] = yield select((state: AppState) => state.automatics);
    if (statusRequest === 'success') {
      postmessage.emit('@Automatic/getAutomaticBadgesSuccess', { data: automatics });
      yield put(getAutomatics.success({ automatics }));
    } else {
      const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
        url: 'automatics',
      });
      const _dataError = res.data as ResponseError;
      const _dataSuccess = res.data as ResponseSuccess;
      if (_dataError.code) throw new Error(_dataError.message);
      postmessage.emit('@Automatic/getAutomaticBadgesSuccess', { data: _dataSuccess.data.items });
      yield put(getAutomatics.success({ automatics: _dataSuccess.data.items }));
    }
  } catch (err) {
    yield put(getAutomatics.failure(undefined));
  }
}

export function* watchGetAutomatics() {
  while (true) {
    const actionWatchgetAutomatics: ReturnType<typeof getAutomatics.request> = yield take(getActionType(getAutomatics.request));
    if (!!task) {
      task.cancel();
    }
    task = yield fork(handleGetAutomatics, actionWatchgetAutomatics);
  }
}

export function* watchGetAutomaticsCancel() {
  while (true) {
    const actionGetAutomaticsCancel: ReturnType<typeof getAutomatics.cancel> = yield take(getActionType(getAutomatics.cancel));
    if (!!task && actionGetAutomaticsCancel.type === '@Automatic/getAutomaticsCancel') {
      task.cancel();
    }
  }
}