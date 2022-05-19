import { put, retry, takeEvery } from '@redux-saga/core/effects';
import { pmAjax } from 'utils/initPostmesssage';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { createBadge } from '../../actions/actionCUDBadge';
import { ResponseSuccess } from '../../CreateBadgeAPI';

let CreateBadgesSuccess: (() => void) | undefined;
let CreateBadgesFailure: (() => void) | undefined;

const CreateBadgesFlow = () => {
  return new Promise<ResponseSuccess>((resolve, reject) => {
    CreateBadgesSuccess?.();
    CreateBadgesFailure?.();

    CreateBadgesSuccess = pmAjax.on('createManualBadges/success', data => {
      resolve(data);
    });

    CreateBadgesFailure = pmAjax.on('createManualBadges/failure', () => {
      reject();
    });
  });
};

function* handleCreateBadge({ payload }: ReturnType<typeof createBadge.request>) {
  const { badge_id, config, slug, productIds } = payload;
  pmAjax.emit('createManualBadges/request', { badgeUrl: badge_id, config, slugs: slug.join(','), productIDs: productIds.join(',') });

  try {
    const res: Awaited<ReturnType<typeof CreateBadgesFlow>> = yield retry(3, 1000, CreateBadgesFlow);
    const _dataSuccess = res;

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
