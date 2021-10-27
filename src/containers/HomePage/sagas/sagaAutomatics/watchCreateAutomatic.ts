import { put, retry, takeEvery } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { createAutomatic } from '../../actions/actionAutomaticProducts';
import { Params, ResponseSuccess, ResponseError } from '../../CreateBadgeAutomaticAPI';

function* handleCreateAutomatic({ payload }: ReturnType<typeof createAutomatic.request>) {
  try {
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: 'automatics',
      method: 'post',
      data: {
        badge_id: payload.badge_id,
        config: payload.config,
        description: payload.description,
        postType: payload.postType,
        title: payload.title,
      } as Params,
    });
    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;
    if (_dataError.code) postmessage.emit('@CUDAutomatic/createAutomaticFailure', { message: _dataError.message });
    postmessage.emit('@CUDAutomatic/createAutomaticSuccess', { id: _dataSuccess.data.id });
    yield put(createAutomatic.success(payload));
  } catch (err) {
    const _err = err as Error;
    postmessage.emit('@CUDAutomatic/createAutomaticFailure', { message: _err.message });
    yield put(createAutomatic.failure(payload));
  }
}

export function* watchCreateAutomatic() {
  yield takeEvery(getActionType(createAutomatic.request), handleCreateAutomatic);
}
