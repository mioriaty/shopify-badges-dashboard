import { put, retry, takeEvery } from '@redux-saga/core/effects';
import { pmAjax } from 'utils/initPostmesssage';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { createAutomatic } from '../../actions/actionAutomaticProducts';
import { ResponseSuccess } from '../../CreateBadgeAutomaticAPI';

let CreateAutomaticSuccess: (() => void) | undefined;
let CreateAutomaticFailure: (() => void) | undefined;

const CreateAutomatic = () => {
  return new Promise<ResponseSuccess>((resolve, reject) => {
    CreateAutomaticSuccess?.();
    CreateAutomaticFailure?.();

    CreateAutomaticSuccess = pmAjax.on('createBadgeAutomatic/success', data => {
      resolve(data);
    });
    CreateAutomaticFailure = pmAjax.on('createBadgeAutomatic/failure', () => {
      reject();
    });
  });
};

function* handleCreateAutomatic({ payload }: ReturnType<typeof createAutomatic.request>) {
  const { badge_id, config, description, postType, title, discount, interval, status, tagSelected, quantity, atLeast, filter, baseUrl } = payload;

  pmAjax.emit('createBadgeAutomatic/request', {
    badgeUrl: baseUrl,
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
  });

  try {
    const res: Awaited<ReturnType<typeof CreateAutomatic>> = yield retry(3, 1000, CreateAutomatic);
    const _dataSuccess = res;

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
