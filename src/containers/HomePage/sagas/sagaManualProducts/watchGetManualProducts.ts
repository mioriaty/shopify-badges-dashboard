import { AxiosResponse } from 'axios';
import { Task } from 'redux-saga';
import { fork, take, put, retry, select } from 'redux-saga/effects';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { getManualProducts } from '../../actions/actionManualProducts';
import { Params, ResponseError, ResponseSuccess } from '../../ProductAPI';
import { transformNewProduct } from '../sagaFullProducts/utils';

let task: Task | undefined;

function* handleGetManualProducts(_: ReturnType<typeof getManualProducts.request>) {
  try {
    const { activeKey, data }: AppState['manualProducts'] = yield select((state: AppState) => state.manualProducts);
    const { statusRequest, products, hasNextPage, lastCursor, maxPages } = data[activeKey] as Exclude<
      AppState['manualProducts']['data'][string],
      undefined
    >;
    if (statusRequest === 'success') {
      const transformProduct = transformNewProduct(products);
      postmessage.emit('@ProductPage/manualProductSuccess', { fullProducts: { items: transformProduct, hasNextPage, maxPages } });
      yield put(getManualProducts.success({ products, hasNextPage, lastCursor, maxPages }));
    } else {
      const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
        url: 'manual-products',
        params: {
          s: activeKey ? activeKey : undefined,
          limit: 50,
        } as Params,
      });
      const _dataError = res.data as ResponseError;
      const _dataSuccess = res.data as ResponseSuccess;
      if (_dataError.code) throw new Error(_dataError.message);

      const transformProduct = transformNewProduct(_dataSuccess.data.items);

      postmessage.emit('@ProductPage/manualProductSuccess', {
        fullProducts: { items: transformProduct, hasNextPage: _dataSuccess.data.hasNextPage, maxPages: _dataSuccess.data.maxPages },
      });

      yield put(
        getManualProducts.success({
          products: _dataSuccess.data.items,
          hasNextPage: _dataSuccess.data.hasNextPage,
          lastCursor: '',
          maxPages: _dataSuccess.data.maxPages,
        }),
      );
    }
  } catch (err) {
    yield put(getManualProducts.failure({ message: err }));
  }
}

export function* watchGetManualProducts() {
  while (true) {
    const actionWatchGetManualProducts: ReturnType<typeof getManualProducts.request> = yield take(getActionType(getManualProducts.request));
    if (!!task) {
      task.cancel();
    }
    task = yield fork(handleGetManualProducts, actionWatchGetManualProducts);
  }
}

export function* watchGetManualProductsCancel() {
  while (true) {
    const actionwatchGetManualProductsCancel: ReturnType<typeof getManualProducts.cancel> = yield take(getActionType(getManualProducts.cancel));
    if (!!task && actionwatchGetManualProductsCancel.type === '@ManualProducts/getManualProductsCancel') {
      task.cancel();
    }
  }
}
