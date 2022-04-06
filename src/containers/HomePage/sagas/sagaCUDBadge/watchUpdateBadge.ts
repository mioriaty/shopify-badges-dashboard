import { put, retry, takeEvery } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { updateBadge } from '../../actions/actionCUDBadge';
import { ResponseError, ResponseSuccess } from '../../UpdateBadgeAPI';

function* handleUpdateBadge({ payload }: ReturnType<typeof updateBadge.request>) {
  const { id, badge_id, config, slug, productIds } = payload;
  try {
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: `manual-products`,
      method: 'put',
      data: {
        badgeUrl: badge_id,
        config,
        slugs: slug.join(','),
        ids: id.join(','),
        productIDs: productIds.join(','),
      },
    });
    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;
    if (_dataError.code) throw new Error(_dataError.message);
    console.log('_dataSuccess', _dataSuccess);
    postmessage.emit('@CUDBadge/updateBadgesSuccess', { data: _dataSuccess.data.items, message: _dataSuccess.message });
    yield put(updateBadge.success(payload));
  } catch (err) {
    const _err = err as Error;
    postmessage.emit('@CUDBadge/updateBadgesFailure', { message: _err.message });
    yield put(updateBadge.failure(payload));
  }
}

export function* watchUpdateBadge() {
  yield takeEvery(getActionType(updateBadge.request), handleUpdateBadge);
}
