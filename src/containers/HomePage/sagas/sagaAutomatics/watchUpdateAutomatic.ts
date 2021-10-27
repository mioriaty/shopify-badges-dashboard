import { put, retry, takeEvery } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { updateAutomatic } from '../../actions/actionAutomaticProducts';
import { Params, ResponseSuccess, ResponseError } from '../../UpdateBadgeAutomaticAPI';

function* handleUpdateAutomatic({ payload }: ReturnType<typeof updateAutomatic.request>) {
  try {
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: `automatics/${payload.id}`,
      method: 'put',
      data: {
        badge_id: payload.badge_id,
        config: payload.config,
        description: payload.description,
        title: payload.title,
      } as Params,
    });
    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;
    if (_dataError.code) throw new Error(_dataError.message);
    console.log(_dataSuccess);
    postmessage.emit('@CUDAutomatic/updateAutomaticSuccess', { id: _dataSuccess.data.id });
    yield put(updateAutomatic.success(payload));
  } catch (err) {
    yield put(updateAutomatic.failure(payload));
  }
}

export function* watchUpdateAutomatic() {
  yield takeEvery(getActionType(updateAutomatic.request), handleUpdateAutomatic);
}
