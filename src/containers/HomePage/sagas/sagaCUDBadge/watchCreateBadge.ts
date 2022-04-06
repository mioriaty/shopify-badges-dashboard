import { put, retry, takeEvery } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { createBadge } from '../../actions/actionCUDBadge';
import { ResponseError, ResponseSuccess } from '../../CreateBadgeAPI';

function* handleCreateBadge({ payload }: ReturnType<typeof createBadge.request>) {
  const { badge_id, config, slug, productIds } = payload;
  try {
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: 'manual-products',
      method: 'post',
      data: {
        badgeUrl: badge_id,
        config,
        slugs: slug.join(','),
        productIDs: productIds.join(','),
      },
    });
    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;
    if (_dataError.code) throw new Error(_dataError.message);
    postmessage.emit('@CUDBadge/createBadgesSuccess', { data: _dataSuccess.data.items, message: _dataSuccess.message });
    yield put(createBadge.success(payload));
  } catch (err) {
    const _err = err as Error;
    postmessage.emit('@CUDBadge/createBadgesFailure', { message: _err.message });
    yield put(createBadge.failure(payload));
  }
}

export function* watchCreateBadge() {
  yield takeEvery(getActionType(createBadge.request), handleCreateBadge);
}
