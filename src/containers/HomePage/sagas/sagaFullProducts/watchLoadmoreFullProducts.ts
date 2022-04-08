import { AxiosResponse } from 'axios';
import { Task } from 'redux-saga';
import { fork, take, select, put, retry } from 'redux-saga/effects';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { loadmoreFullProducts } from '../../actions/actionFullProducts';
import { Params, ResponseError, ResponseSuccess } from '../../ProductAPI';
import { transformNewProduct } from './utils';

let task: Task | undefined;

function* handleLoadmoreFullProducts(_: ReturnType<typeof loadmoreFullProducts.request>) {
  try {
    const { activeKey, data }: AppState['fullProducts'] = yield select((state: AppState) => state.fullProducts);
    const { currentPage } = data[activeKey] as Exclude<AppState['fullProducts']['data'][string], undefined>;

    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 2000, fetchAPI.request, {
      url: 'full-products',
      params: {
        s: activeKey ? activeKey : undefined,
        page: currentPage + 1,
      } as Params,
    });
    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;
    if (_dataError.code) throw new Error(_dataError.message);

    const transformedData = transformNewProduct(_dataSuccess.data.items);
    postmessage.emit('@ProductPage/fullProductLoadMoreSuccess', {
      fullProducts: {
        items: transformedData,
        hasNextPage: _dataSuccess.data.hasNextPage,
        maxPages: _dataSuccess.data.maxPages,
        currentPage: _dataSuccess.data.currentPage,
      },
    });

    yield put(
      loadmoreFullProducts.success({
        products: _dataSuccess.data.items,
        hasNextPage: _dataSuccess.data.hasNextPage,
        lastCursor: '',
        maxPages: _dataSuccess.data.maxPages,
        currentPage: _dataSuccess.data.currentPage,
      }),
    );
  } catch (err) {
    const _err = err as Error;
    postmessage.emit('@ProductPage/fullProductLoadMoreFailure', {
      message: _err.message,
    });
    yield put(loadmoreFullProducts.failure(undefined));
  }
}

export function* watchLoadmoreFullProducts() {
  while (true) {
    const actionWatchloadmoreFullProducts: ReturnType<typeof loadmoreFullProducts.request> = yield take(getActionType(loadmoreFullProducts.request));
    if (!!task) {
      task.cancel();
    }
    task = yield fork(handleLoadmoreFullProducts, actionWatchloadmoreFullProducts);
  }
}

export function* watchLoadmoreFullProductsCancel() {
  while (true) {
    const actionwatchloadmoreFullProductsCancel: ReturnType<typeof loadmoreFullProducts.cancel> = yield take(
      getActionType(loadmoreFullProducts.cancel),
    );
    if (!!task && actionwatchloadmoreFullProductsCancel.type === '@FullProducts/loadmoreFullProductsCancel') {
      task.cancel();
    }
  }
}
