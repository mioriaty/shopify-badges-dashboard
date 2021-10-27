import { AxiosResponse } from 'axios';
import { Task } from 'redux-saga';
import { fork, take, put, retry, select } from 'redux-saga/effects';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { getBadges } from '../../actions/actionBadges';
import { Params, ResponseError, ResponseSuccess } from '../../BadgeAPI';

let task: Task | undefined;

function* handleGetBadges({ payload: { taxName, taxSlugs, limit } }: ReturnType<typeof getBadges.request>) {
  try {
    const { activeKey, data }: AppState['badges'] = yield select((state: AppState) => state.badges);
    const { statusRequest, badges, maxPage } = data[activeKey] as Exclude<AppState['badges']['data'][string], undefined>;
    if (statusRequest === 'success') {
      postmessage.emit('@BadgesPage/getBadgesSuccess', { data: { items: badges, maxPages: maxPage } });
      yield put(getBadges.success({ badges, maxPage }));
    } else {
      const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
        url: 'default-badges',
        params: {
          s: activeKey ? activeKey : undefined,
          taxName: taxName ? taxName : undefined,
          taxSlugs: taxSlugs ? taxSlugs : undefined,
          limit: limit ? limit : 50,
        } as Params,
      });
      const _dataError = res.data as ResponseError;
      const _dataSuccess = res.data as ResponseSuccess;
      if (_dataError.code) throw new Error(_dataError.message);
      postmessage.emit('@BadgesPage/getBadgesSuccess', { data: { items: _dataSuccess.data.items, maxPages: _dataSuccess.data.maxPage } });
      yield put(getBadges.success({ badges: _dataSuccess.data.items, maxPage: _dataSuccess.data.maxPage }));
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
