import { put, retry, takeEvery } from '@redux-saga/core/effects';
import { pmAjax } from 'utils/initPostmesssage';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { updateAutomatic } from '../../actions/actionAutomaticProducts';
import { ResponseSuccess } from '../../UpdateBadgeAutomaticAPI';

let UpdateAutomaticSuccess: (() => void) | undefined;
let UpdateAutomaticFailure: (() => void) | undefined;

const UpdateAutomatic = () => {
  return new Promise<ResponseSuccess>((resolve, reject) => {
    UpdateAutomaticSuccess?.();
    UpdateAutomaticFailure?.();

    UpdateAutomaticSuccess = pmAjax.on('updateBadgeAutomatic/success', data => {
      resolve(data);
    });
    UpdateAutomaticFailure = pmAjax.on('updateBadgeAutomatic/failure', () => {
      reject();
    });
  });
};

function* handleUpdateAutomatic({ payload }: ReturnType<typeof updateAutomatic.request>) {
  const { badge_id, config, description, id, title, discount, interval, status, tagSelected, quantity, atLeast, filter, baseUrl } = payload;
  pmAjax.emit('updateBadgeAutomatic/request', {
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
    id,
  });

  try {
    const res: Awaited<ReturnType<typeof UpdateAutomatic>> = yield retry(3, 1000, UpdateAutomatic);
    const _dataSuccess = res;

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
