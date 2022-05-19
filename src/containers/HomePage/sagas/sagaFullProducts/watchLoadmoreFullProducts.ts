import { Task } from 'redux-saga';
import { fork, put, retry, select, take } from 'redux-saga/effects';
import { pmAjax } from 'utils/initPostmesssage';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { loadmoreFullProducts } from '../../actions/actionFullProducts';
import { ResponseSuccess } from '../../ProductAPI';
import { transformNewProduct } from './utils';

let task: Task | undefined;

let GetProductsSuccess: (() => void) | undefined;
let GetProductsFailure: (() => void) | undefined;

const GetProductsFlow = () => {
  return new Promise<ResponseSuccess>((resolve, reject) => {
    GetProductsSuccess?.();
    GetProductsFailure?.();

    GetProductsSuccess = pmAjax.on('loadMoreFullProducts/success', data => {
      resolve(data);
    });

    GetProductsFailure = pmAjax.on('loadMoreFullProducts/failure', () => {
      reject();
    });
  });
};

function* handleLoadmoreFullProducts(_: ReturnType<typeof loadmoreFullProducts.request>) {
  const { activeKey, data }: AppState['fullProducts'] = yield select((state: AppState) => state.fullProducts);
  const { currentPage } = data[activeKey] as Exclude<AppState['fullProducts']['data'][string], undefined>;

  pmAjax.emit('loadMoreFullProducts/request', {
    s: activeKey ? activeKey : undefined,
    page: currentPage + 1,
  });

  try {
    const res: Awaited<ReturnType<typeof GetProductsFlow>> = yield retry(3, 2000, GetProductsFlow);
    const _dataSuccess = res;
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
