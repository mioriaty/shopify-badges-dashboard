import { Task } from 'redux-saga';
import { fork, put, retry, select, take } from 'redux-saga/effects';
import { pmAjax } from 'utils/initPostmesssage';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { getManualProducts } from '../../actions/actionManualProducts';
import { ResponseSuccess } from '../../ProductAPI';
import { transformNewProduct } from '../sagaFullProducts/utils';

let task: Task | undefined;

let GetProductsSuccess: (() => void) | undefined;
let GetProductsFailure: (() => void) | undefined;

const GetProductsFlow = () => {
  return new Promise<ResponseSuccess>((resolve, reject) => {
    GetProductsSuccess?.();
    GetProductsFailure?.();

    GetProductsSuccess = pmAjax.on('getManualProducts/success', data => {
      resolve(data);
    });

    GetProductsFailure = pmAjax.on('getManualProducts/failure', () => {
      reject();
    });
  });
};

function* handleGetManualProducts(_: ReturnType<typeof getManualProducts.request>) {
  const { activeKey }: AppState['manualProducts'] = yield select((state: AppState) => state.manualProducts);
  pmAjax.emit('getManualProducts/request', {
    s: activeKey ? activeKey : undefined,
  });

  try {
    const res: Awaited<ReturnType<typeof GetProductsFlow>> = yield retry(3, 1000, GetProductsFlow);
    const _dataSuccess = res.data;

    const transformProduct = transformNewProduct(_dataSuccess.items);

    postmessage.emit('@ProductPage/manualProductSuccess', {
      fullProducts: { items: transformProduct, hasNextPage: _dataSuccess.hasNextPage, maxPages: _dataSuccess.maxPages },
    });

    yield put(
      getManualProducts.success({
        products: _dataSuccess.items,
        hasNextPage: _dataSuccess.hasNextPage,
        lastCursor: '',
        maxPages: _dataSuccess.maxPages,
        currentPage: _dataSuccess.currentPage,
      }),
    );
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
