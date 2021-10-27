import { AxiosResponse } from 'axios';
import { Task } from 'redux-saga';
import { fork, take, put, retry, select } from 'redux-saga/effects';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { getFullProducts } from '../../actions/actionFullProducts';
import { Params, ResponseError, ResponseSuccess } from '../../ProductAPI';

let task: Task | undefined;

function* handleGetFullProducts(_: ReturnType<typeof getFullProducts.request>) {
  try {
    const { activeKey, data }: AppState['fullProducts'] = yield select((state: AppState) => state.fullProducts);
    const { statusRequest, products, hasNextPage, lastCursor } = data[activeKey] as Exclude<AppState['fullProducts']['data'][string], undefined>;

    if (statusRequest === 'success') {
      postmessage.emit('@ProductPage/fullProductSuccess', { fullProducts: { items: products, hasNextPage } });
      yield put(getFullProducts.success({ products, hasNextPage, lastCursor }));
    } else {
      console.log('123456');

      const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
        url: 'full-products',
        params: {
          s: activeKey ? activeKey : undefined,
          limit: 50,
        } as Params,
      });

      console.log('full-products', { res });

      const _dataError = res.data as ResponseError;
      const _dataSuccess = res.data as ResponseSuccess;
      if (_dataError.code) throw new Error(_dataError.message);
      postmessage.emit('@ProductPage/fullProductSuccess', {
        fullProducts: {
          items: _dataSuccess.data.items,
          hasNextPage: _dataSuccess.data.hasNextPage,
        },
      });
      const lastCursor = _dataSuccess.data.items[_dataSuccess.data.items.length - 1].cursor;

      yield put(
        getFullProducts.success({
          products: _dataSuccess.data.items,
          hasNextPage: _dataSuccess.data.hasNextPage,
          lastCursor: lastCursor,
          // lastCursor: _dataSuccess.data.items.at(-1).cursor as string,
        }),
      );
    }
  } catch (err) {
    yield put(getFullProducts.failure(undefined));
  }
}

export function* watchGetFullProducts() {
  while (true) {
    const actionWatchGetFullProducts: ReturnType<typeof getFullProducts.request> = yield take(getActionType(getFullProducts.request));
    if (!!task) {
      task.cancel();
    }
    task = yield fork(handleGetFullProducts, actionWatchGetFullProducts);
  }
}

export function* watchGetFullProductsCancel() {
  while (true) {
    const actionwatchGetFullProductsCancel: ReturnType<typeof getFullProducts.cancel> = yield take(getActionType(getFullProducts.cancel));
    if (!!task && actionwatchGetFullProductsCancel.type === '@FullProducts/getFullProductsCancel') {
      task.cancel();
    }
  }
}