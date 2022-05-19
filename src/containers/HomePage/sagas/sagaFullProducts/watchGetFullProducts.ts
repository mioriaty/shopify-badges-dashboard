import { Task } from 'redux-saga';
import { fork, put, retry, select, take } from 'redux-saga/effects';
import { pmAjax } from 'utils/initPostmesssage';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { getFullProducts } from '../../actions/actionFullProducts';
import { ResponseSuccess } from '../../ProductAPI';
import { transformNewProduct } from './utils';

let task: Task | undefined;

let GetProductsSuccess: (() => void) | undefined;
let GetProductsFailure: (() => void) | undefined;

const GetProductsFlow = () => {
  return new Promise<ResponseSuccess>((resolve, reject) => {
    GetProductsSuccess?.();
    GetProductsFailure?.();

    GetProductsSuccess = pmAjax.on('getFullProducts/success', data => {
      resolve(data);
    });

    GetProductsFailure = pmAjax.on('getFullProducts/failure', () => {
      reject();
    });
  });
};

function* handleGetFullProducts(_: ReturnType<typeof getFullProducts.request>) {
  const { activeKey }: AppState['fullProducts'] = yield select((state: AppState) => state.fullProducts);
  pmAjax.emit('getFullProducts/request', {
    s: activeKey ? activeKey : undefined,
  });

  try {
    const res: Awaited<ReturnType<typeof GetProductsFlow>> = yield retry(3, 1000, GetProductsFlow);

    const _dataSuccess = res.data;
    const transformProduct = transformNewProduct(_dataSuccess.items);

    postmessage.emit('@ProductPage/fullProductSuccess', {
      fullProducts: {
        items: transformProduct,
        hasNextPage: _dataSuccess.hasNextPage,
        maxPages: _dataSuccess.maxPages,
      },
    });

    const lastCursor = _dataSuccess.items[_dataSuccess.items.length - 1]?.id;

    yield put(
      getFullProducts.success({
        products: _dataSuccess.items,
        hasNextPage: _dataSuccess.hasNextPage,
        lastCursor: lastCursor,
        maxPages: _dataSuccess.maxPages,
        currentPage: _dataSuccess.currentPage,
        // lastCursor: _dataSuccess.data.items.at(-1).cursor as string,
      }),
    );
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
