import { put, retry, takeEvery } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { createAutomatic } from '../../actions/actionAutomaticProducts';
import { ResponseSuccess, ResponseError } from '../../CreateBadgeAutomaticAPI';

function* handleCreateAutomatic({ payload }: ReturnType<typeof createAutomatic.request>) {
  const { badge_id, config, description, postType, title, discount, interval, status, tagSelected, quantity, atLeast, filter, baseUrl } = payload;
  try {
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: 'automatics',
      method: 'post',
      data: {
        badgeUrl: badge_id ?? baseUrl,
        badge_id: badge_id,
        config: config,
        description: description,
        postType: postType,
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
    if (_dataError.code) postmessage.emit('@CUDAutomatic/createAutomaticFailure', { message: _dataError.message });
    postmessage.emit('@CUDAutomatic/createAutomaticSuccess', {
      id: _dataSuccess.data.id,
      description: _dataSuccess.data.description,
      message: _dataSuccess.message,
    });
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
