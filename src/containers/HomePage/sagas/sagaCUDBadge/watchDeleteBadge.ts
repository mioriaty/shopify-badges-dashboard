import { put, retry, takeEvery } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteBadge } from '../../actions/actionCUDBadge';
import { ResponseError, ResponseSuccess } from '../../DeleteBadgeAPI';

function* handleDeleteBadge({ payload }: ReturnType<typeof deleteBadge.request>) {
  const { ids } = payload;
  try {
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: `manual-products`,
      method: 'DELETE',
      data: { ids: ids.join(',') },
    });
    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;
    if (_dataError.code) throw new Error(_dataError.message);
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
