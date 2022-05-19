import { notification } from 'antd';
import { put, retry, takeEvery } from 'redux-saga/effects';
import { pmAjax } from 'utils/initPostmesssage';
import { getActionType } from 'wiloke-react-core/utils';
import { sortAutomatic } from '../../actions/actionAutomaticProducts';
import { ResponseSuccess } from '../../SortAutomaticAPI';

let SortAutomaticSuccess: (() => void) | undefined;
let SortAutomaticFailure: (() => void) | undefined;

const SortAutomatic = () => {
  return new Promise<ResponseSuccess>((resolve, reject) => {
    SortAutomaticSuccess?.();
    SortAutomaticFailure?.();

    SortAutomaticSuccess = pmAjax.on('sortAutomatics/success', data => {
      resolve(data);
    });
    SortAutomaticFailure = pmAjax.on('sortAutomatics/failure', () => {
      reject();
    });
  });
};

function* handleSort({ payload }: ReturnType<typeof sortAutomatic.request>) {
  const { listPostType } = payload;

  pmAjax.emit('sortAutomatics/request', {
    priority: listPostType.join(','),
  });

  try {
    const res: Awaited<ReturnType<typeof SortAutomatic>> = yield retry(3, 500, SortAutomatic);

    const _dataSuccess = res;

    yield put(sortAutomatic.success({ message: _dataSuccess.message }));
    notification.success({
      message: _dataSuccess.message,
    });
  } catch (error) {
    yield sortAutomatic.failure(undefined);
  }
}

export function* watchSortAutomatic() {
  yield takeEvery(getActionType(sortAutomatic.request), handleSort);
}
