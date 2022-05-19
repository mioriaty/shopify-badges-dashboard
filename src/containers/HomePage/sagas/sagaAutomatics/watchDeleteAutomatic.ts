import { put, retry, takeEvery } from '@redux-saga/core/effects';
import { pmAjax } from 'utils/initPostmesssage';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteAutomatic } from '../../actions/actionAutomaticProducts';
import { ResponseSuccess } from '../../DeleteBadgeAutomaticAPI';

let DeleteAutomaticSuccess: (() => void) | undefined;
let DeleteAutomaticFailure: (() => void) | undefined;

const DeleteAutomatic = () => {
  return new Promise<ResponseSuccess>((resolve, reject) => {
    DeleteAutomaticSuccess?.();
    DeleteAutomaticFailure?.();

    DeleteAutomaticSuccess = pmAjax.on('deleteBadgeAutomatic/success', data => {
      resolve(data);
    });
    DeleteAutomaticFailure = pmAjax.on('deleteBadgeAutomatic/failure', () => {
      reject();
    });
  });
};

function* handleDeleteAutomatic({ payload }: ReturnType<typeof deleteAutomatic.request>) {
  pmAjax.emit('deleteBadgeAutomatic/request', {
    id: payload.id,
    postType: payload.postType,
  });

  try {
    const res: Awaited<ReturnType<typeof DeleteAutomatic>> = yield retry(3, 1000, DeleteAutomatic);
    const _dataSuccess = res;
    postmessage.emit('@CUDAutomatic/deleteAutomaticSuccess', {
      id: _dataSuccess.data.id,
      urlImage: _dataSuccess.data.urlImage,
      description: _dataSuccess.status,
      message: _dataSuccess.message,
    });
    yield put(deleteAutomatic.success(payload));
  } catch (err) {
    yield put(deleteAutomatic.failure(payload));
  }
}

export function* watchDeleteAutomatic() {
  yield takeEvery(getActionType(deleteAutomatic.request), handleDeleteAutomatic);
}
