import { put, retry, takeEvery } from '@redux-saga/core/effects';
import { pmAjax } from 'utils/initPostmesssage';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteBadge } from '../../actions/actionCUDBadge';
import { ResponseSuccess } from '../../DeleteBadgeAPI';

let DeleteBadgesSuccess: (() => void) | undefined;
let DeleteBadgesFailure: (() => void) | undefined;

const DeleteBadgesFlow = () => {
  return new Promise<ResponseSuccess>((resolve, reject) => {
    DeleteBadgesSuccess?.();
    DeleteBadgesFailure?.();

    DeleteBadgesSuccess = pmAjax.on('deleteManualBadges/success', data => {
      resolve(data);
    });

    DeleteBadgesFailure = pmAjax.on('deleteManualBadges/failure', () => {
      reject();
    });
  });
};

function* handleDeleteBadge({ payload }: ReturnType<typeof deleteBadge.request>) {
  const { ids } = payload;
  pmAjax.emit('deleteManualBadges/request', { ids: ids.join(',') });

  try {
    const res: Awaited<ReturnType<typeof DeleteBadgesFlow>> = yield retry(3, 1000, DeleteBadgesFlow);
    const _dataSuccess = res;

    console.log('_dataSuccess', _dataSuccess);
    postmessage.emit('@CUDBadge/deleteBadgesSuccess', { id: _dataSuccess.data.id, message: _dataSuccess.message });
    yield put(deleteBadge.success(payload));
  } catch (err) {
    yield put(deleteBadge.failure(payload));
  }
}

export function* watchDeleteBadge() {
  yield takeEvery(getActionType(deleteBadge.request), handleDeleteBadge);
}
