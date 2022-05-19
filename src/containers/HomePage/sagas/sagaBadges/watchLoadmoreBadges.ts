import { Task } from 'redux-saga';
import { fork, put, retry, select, take } from 'redux-saga/effects';
import { pmAjax } from 'utils/initPostmesssage';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { loadmoreBadges } from '../../actions/actionBadges';
import { ResponseSuccess } from '../../BadgeAPI';

let task: Task | undefined;

let GetBadgesSuccess: (() => void) | undefined;
let GetBadgesFailure: (() => void) | undefined;

const GetBadgesFlow = () => {
  return new Promise<ResponseSuccess>((resolve, reject) => {
    GetBadgesSuccess?.();
    GetBadgesFailure?.();

    GetBadgesSuccess = pmAjax.on('loadMoreManualBadges/success', data => {
      resolve(data);
    });

    GetBadgesFailure = pmAjax.on('loadMoreManualBadges/failure', () => {
      reject();
    });
  });
};

function* handleloadmoreBadges({ payload }: ReturnType<typeof loadmoreBadges.request>) {
  const { limit } = payload;
  const { activeKey, data }: AppState['badges'] = yield select((state: AppState) => state.badges);
  const { currentPage } = data[activeKey] as Exclude<AppState['badges']['data'][string], undefined>;

  pmAjax.emit('loadMoreManualBadges/request', {
    s: activeKey ? activeKey : undefined,
    page: currentPage + 1,
    limit: limit ? limit : 10,
  });

  try {
    const res: Awaited<ReturnType<typeof GetBadgesFlow>> = yield retry(3, 1000, GetBadgesFlow);
    const _dataSuccess = res;

    yield put(loadmoreBadges.success({ badges: _dataSuccess.data.items, maxPage: _dataSuccess.data.maxPage }));
    postmessage.emit('@BadgesPage/loadMoreBadgesSuccess', { data: { maxPages: _dataSuccess.data.maxPage, items: _dataSuccess.data.items } });
  } catch (err) {
    yield put(loadmoreBadges.failure(undefined));
  }
}

export function* watchloadmoreBadges() {
  while (true) {
    const actionWatchloadmoreBadges: ReturnType<typeof loadmoreBadges.request> = yield take(getActionType(loadmoreBadges.request));
    if (!!task) {
      task.cancel();
    }
    task = yield fork(handleloadmoreBadges, actionWatchloadmoreBadges);
  }
}

export function* watchloadmoreBadgesCancel() {
  while (true) {
    const actionwatchloadmoreBadgesCancel: ReturnType<typeof loadmoreBadges.cancel> = yield take(getActionType(loadmoreBadges.cancel));
    if (!!task && actionwatchloadmoreBadgesCancel.type === '@Badges/loadmoreBadgesCancel') {
      task.cancel();
    }
  }
}
