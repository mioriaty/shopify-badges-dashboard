import { Task } from 'redux-saga';
import { fork, put, retry, select, take } from 'redux-saga/effects';
import { pmAjax } from 'utils/initPostmesssage';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { getBadges } from '../../actions/actionBadges';
import { ResponseSuccess } from '../../BadgeAPI';

let task: Task | undefined;

let GetBadgesSuccess: (() => void) | undefined;
let GetBadgesFailure: (() => void) | undefined;

const GetBadgesFlow = () => {
  return new Promise<ResponseSuccess>((resolve, reject) => {
    GetBadgesSuccess?.();
    GetBadgesFailure?.();

    GetBadgesSuccess = pmAjax.on('getManualBadges/success', data => {
      resolve(data);
    });

    GetBadgesFailure = pmAjax.on('getManualBadges/failure', () => {
      reject();
    });
  });
};

function* handleGetBadges({ payload: { taxName, taxSlugs, limit } }: ReturnType<typeof getBadges.request>) {
  const { activeKey, data }: AppState['badges'] = yield select((state: AppState) => state.badges);

  pmAjax.emit('getManualBadges/request', {
    s: activeKey ? activeKey : undefined,
    taxName: taxName ? taxName : undefined,
    taxSlugs: taxSlugs ? taxSlugs : undefined,
    limit: limit ? limit : 50,
  });

  try {
    const { statusRequest, badges, maxPage } = data[activeKey] as Exclude<AppState['badges']['data'][string], undefined>;
    if (statusRequest === 'success') {
      postmessage.emit('@BadgesPage/getBadgesSuccess', { data: { items: badges, maxPages: maxPage } });
      yield put(getBadges.success({ badges, maxPage }));
    } else {
      const res: Awaited<ReturnType<typeof GetBadgesFlow>> = yield retry(3, 1000, GetBadgesFlow);
      const _dataSuccess = res.data;

      postmessage.emit('@BadgesPage/getBadgesSuccess', { data: { items: _dataSuccess.items, maxPages: _dataSuccess.maxPage } });
      yield put(getBadges.success({ badges: _dataSuccess.items, maxPage: _dataSuccess.maxPage }));
    }
  } catch (err) {
    yield put(getBadges.failure(undefined));
  }
}

export function* watchGetBadges() {
  while (true) {
    const actionWatchGetBadges: ReturnType<typeof getBadges.request> = yield take(getActionType(getBadges.request));
    if (!!task) {
      task.cancel();
    }
    task = yield fork(handleGetBadges, actionWatchGetBadges);
  }
}

export function* watchGetBadgesCancel() {
  while (true) {
    const actionwatchGetBadgesCancel: ReturnType<typeof getBadges.cancel> = yield take(getActionType(getBadges.cancel));
    if (!!task && actionwatchGetBadgesCancel.type === '@Badges/getBadgesCancel') {
      task.cancel();
    }
  }
}
