import { put, retry, takeEvery } from '@redux-saga/core/effects';
import { pmAjax } from 'utils/initPostmesssage';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { updateBadge } from '../../actions/actionCUDBadge';
import { ResponseSuccess } from '../../UpdateBadgeAPI';

let UpdateBadgesSuccess: (() => void) | undefined;
let UpdateBadgesFailure: (() => void) | undefined;

const UpdateBadgesFlow = () => {
  return new Promise<ResponseSuccess>((resolve, reject) => {
    UpdateBadgesSuccess?.();
    UpdateBadgesFailure?.();

    UpdateBadgesSuccess = pmAjax.on('updateManualBadges/success', data => {
      resolve(data);
    });

    UpdateBadgesFailure = pmAjax.on('updateManualBadges/failure', () => {
      reject();
    });
  });
};

function* handleUpdateBadge({ payload }: ReturnType<typeof updateBadge.request>) {
  const { id, badge_id, config, slug, productIds } = payload;

  pmAjax.emit('updateManualBadges/request', {
    badgeUrl: badge_id,
    config,
    slugs: slug.join(','),
    ids: id.join(','),
    productIDs: productIds.join(','),
  });

  try {
    const res: Awaited<ReturnType<typeof UpdateBadgesFlow>> = yield retry(3, 1000, UpdateBadgesFlow);
    const _dataSuccess = res;

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
