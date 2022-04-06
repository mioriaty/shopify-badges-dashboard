import { put, retry, takeEvery } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteAutomatic } from '../../actions/actionAutomaticProducts';
import { Params, ResponseSuccess, ResponseError } from '../../DeleteBadgeAutomaticAPI';

function* handleDeleteAutomatic({ payload }: ReturnType<typeof deleteAutomatic.request>) {
  try {
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: `automatics/${payload.id}`,
      method: 'delete',
      data: { postType: payload.postType } as Params,
    });
    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;
    if (_dataError.code) throw new Error(_dataError.message);
    console.log(_dataSuccess);
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
