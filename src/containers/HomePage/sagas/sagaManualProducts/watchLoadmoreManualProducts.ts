import { AxiosResponse } from 'axios';
import { Task } from 'redux-saga';
import { fork, take, select, put, retry } from 'redux-saga/effects';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { loadmoreManualProducts } from '../../actions/actionManualProducts';
import { Params, ResponseError, ResponseSuccess } from '../../ProductAPI';
import { transformNewProduct } from '../sagaFullProducts/utils';

let task: Task | undefined;

function* handleLoadmoreManualProducts(_: ReturnType<typeof loadmoreManualProducts.request>) {
  try {
    const { activeKey, data }: AppState['manualProducts'] = yield select((state: AppState) => state.manualProducts);
    const { currentPage } = data[activeKey] as Exclude<AppState['manualProducts']['data'][string], undefined>;
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: 'manual-products',
      params: {
        s: activeKey ? activeKey : undefined,
        page: currentPage + 1,
      } as Params,
    });
    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;
    if (_dataError.code) throw new Error(_dataError.message);
    const transformedData = transformNewProduct(_dataSuccess.data.items);

    postmessage.emit('@ProductPage/manualProductLoadMoreSuccess', {
      fullProducts: { items: transformedData, hasNextPage: _dataSuccess.data.hasNextPage, maxPages: _dataSuccess.data.maxPages },
    });

    yield put(
      loadmoreManualProducts.success({
        products: _dataSuccess.data.items,
        hasNextPage: _dataSuccess.data.hasNextPage,
        lastCursor: '',
        maxPages: _dataSuccess.data.maxPages,
      }),
    );
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
