import { Task } from 'redux-saga';
import { fork, put, retry, select, take } from 'redux-saga/effects';
import { pmAjax } from 'utils/initPostmesssage';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { loadmoreManualProducts } from '../../actions/actionManualProducts';
import { ResponseSuccess } from '../../ProductAPI';
import { transformNewProduct } from '../sagaFullProducts/utils';

let task: Task | undefined;

let GetProductsSuccess: (() => void) | undefined;
let GetProductsFailure: (() => void) | undefined;

const GetProductsFlow = () => {
  return new Promise<ResponseSuccess>((resolve, reject) => {
    GetProductsSuccess?.();
    GetProductsFailure?.();

    GetProductsSuccess = pmAjax.on('loadMoreManualProducts/success', data => {
      resolve(data);
    });

    GetProductsFailure = pmAjax.on('loadMoreManualProducts/failure', () => {
      reject();
    });
  });
};

function* handleLoadmoreManualProducts(_: ReturnType<typeof loadmoreManualProducts.request>) {
  const { activeKey, data }: AppState['manualProducts'] = yield select((state: AppState) => state.manualProducts);
  const { currentPage } = data[activeKey] as Exclude<AppState['manualProducts']['data'][string], undefined>;

  pmAjax.emit('loadMoreManualProducts/request', {
    s: activeKey ? activeKey : undefined,
    page: currentPage + 1,
  });

  try {
    const res: Awaited<ReturnType<typeof GetProductsFlow>> = yield retry(3, 1000, GetProductsFlow);
    const _dataSuccess = res;

    const transformedData = transformNewProduct(_dataSuccess.data.items);

    postmessage.emit('@ProductPage/manualProductLoadMoreSuccess', {
      fullProducts: {
        items: transformedData,
        hasNextPage: _dataSuccess.data.hasNextPage,
        maxPages: _dataSuccess.data.maxPages,
        currentPage: _dataSuccess.data.currentPage,
      },
    });

    yield put(
      loadmoreManualProducts.success({
        products: _dataSuccess.data.items,
        hasNextPage: _dataSuccess.data.hasNextPage,
        lastCursor: '',
        maxPages: _dataSuccess.data.maxPages,
        currentPage: _dataSuccess.data.currentPage,
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
