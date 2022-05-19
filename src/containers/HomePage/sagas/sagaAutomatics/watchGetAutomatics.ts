import { Task } from 'redux-saga';
import { fork, put, retry, select, take } from 'redux-saga/effects';
import { pmAjax } from 'utils/initPostmesssage';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { getAutomatics } from '../../actions/actionAutomaticProducts';
import { ResponseSuccess } from '../../AutomaticAPI';

let task: Task | undefined;

let GetAutomaticSuccess: (() => void) | undefined;
let GetAutomaticFailure: (() => void) | undefined;

const GetAutomatics = () => {
  return new Promise<ResponseSuccess>((resolve, reject) => {
    GetAutomaticSuccess?.();
    GetAutomaticFailure?.();

    GetAutomaticSuccess = pmAjax.on('getAutomatics/success', data => {
      resolve(data);
    });
    GetAutomaticFailure = pmAjax.on('getAutomatics/failure', () => {
      reject();
    });
  });
};

function* handleGetAutomatics(_: ReturnType<typeof getAutomatics.request>) {
  const { automatics, statusRequest }: AppState['automatics'] = yield select((state: AppState) => state.automatics);

  pmAjax.emit('getAutomatics/request');

  try {
    if (statusRequest === 'success') {
      postmessage.emit('@Automatic/getAutomaticBadgesSuccess', { data: automatics });
      yield put(getAutomatics.success({ automatics }));
    } else {
      const res: Awaited<ReturnType<typeof GetAutomatics>> = yield retry(3, 1000, GetAutomatics);
      const _dataSuccess = res;

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
