import { put, retry, takeEvery } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { updateAutomatic } from '../../actions/actionAutomaticProducts';
import { ResponseError, ResponseSuccess } from '../../UpdateBadgeAutomaticAPI';

function* handleUpdateAutomatic({ payload }: ReturnType<typeof updateAutomatic.request>) {
  const { badge_id, config, description, id, title, discount, interval, status, tagSelected, quantity, atLeast, filter, baseUrl } = payload;
  try {
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: `automatics/${id}`,
      method: 'put',
      data: {
        badgeUrl: baseUrl,
        badge_id: badge_id,
        config: config,
        description: description,
        title: title,
        status: status ? status : undefined,
        interval: interval ? interval : '7',
        discount: discount ? discount : undefined,
        tagSelected: tagSelected ? tagSelected : '',
        quantity: quantity ? quantity : '10',
        atLeast: atLeast ?? '5',
        filter: filter ?? '',
      },
    });
    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;
    if (_dataError.code) throw new Error(_dataError.message);

    postmessage.emit('@CUDAutomatic/updateAutomaticSuccess', {
      id: _dataSuccess.data.id,
      description: _dataSuccess.data.description,
      message: _dataSuccess.message,
    });
    yield put(updateAutomatic.success(payload));
  } catch (err) {
    yield put(updateAutomatic.failure(payload));
  }
}

export function* watchUpdateAutomatic() {
  yield takeEvery(getActionType(updateAutomatic.request), handleUpdateAutomatic);
}
