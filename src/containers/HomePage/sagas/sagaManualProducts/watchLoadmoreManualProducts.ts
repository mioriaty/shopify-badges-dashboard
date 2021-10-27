import { AxiosResponse } from 'axios';
import { Task } from 'redux-saga';
import { fork, take, select, put, retry } from 'redux-saga/effects';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { loadmoreManualProducts } from '../../actions/actionManualProducts';
import { Params, ResponseError, ResponseSuccess } from '../../ProductAPI';

let task: Task | undefined;

function* handleLoadmoreManualProducts(_: ReturnType<typeof loadmoreManualProducts.request>) {
  try {
    const { activeKey, data }: AppState['manualProducts'] = yield select((state: AppState) => state.manualProducts);
    const { hasNextPage, lastCursor } = data[activeKey] as Exclude<AppState['manualProducts']['data'][string], undefined>;
    if (!hasNextPage) {
      postmessage.emit('@ProductPage/manualProductLoadMoreSuccess', { fullProducts: { items: [], hasNextPage } });
      yield put(loadmoreManualProducts.success({ products: [], hasNextPage: false, lastCursor }));
    } else {
      const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
        url: 'manual-products',
        params: {
          s: activeKey ? activeKey : undefined,
          cursor: lastCursor,
        } as Params,
      });
      const _dataError = res.data as ResponseError;
      const _dataSuccess = res.data as ResponseSuccess;
      if (_dataError.code) throw new Error(_dataError.message);
      postmessage.emit('@ProductPage/manualProductLoadMoreSuccess', {
        fullProducts: { items: _dataSuccess.data.items, hasNextPage: _dataSuccess.data.hasNextPage },
      });
      const _lastCursor = _dataSuccess.data.items[_dataSuccess.data.items.length - 1].cursor;
      yield put(
        loadmoreManualProducts.success({
          products: _dataSuccess.data.items,
          hasNextPage: _dataSuccess.data.hasNextPage,
          lastCursor: _lastCursor,
        }),
      );
    }
  } catch (err) {
    yield put(loadmoreManualProducts.failure(undefined));
  }
}

export function* watchLoadmoreManualProducts() {
  while (true) {
    const actionWatchloadmoreManualProducts: ReturnType<typeof loadmoreManualProducts.request> = yield take(
      getActionType(loadmoreManualProducts.request),
    );
    if (!!task) {
      task.cancel();
    }
    task = yield fork(handleLoadmoreManualProducts, actionWatchloadmoreManualProducts);
  }
}

export function* watchLoadmoreManualProductsCancel() {
  while (true) {
    const actionwatchloadmoreManualProductsCancel: ReturnType<typeof loadmoreManualProducts.cancel> = yield take(
      getActionType(loadmoreManualProducts.cancel),
    );
    if (!!task && actionwatchloadmoreManualProductsCancel.type === '@ManualProducts/loadmoreManualProductsCancel') {
      task.cancel();
    }
  }
}
