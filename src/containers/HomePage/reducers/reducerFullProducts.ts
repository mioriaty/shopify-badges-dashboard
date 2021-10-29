import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { changeActiveKey, getFullProducts, loadmoreFullProducts } from '../actions/actionFullProducts';
import { WordpressProduct } from '../ProductAPI';

interface StateData {
  statusRequest: Status;
  statusLoadmore: Status;
  products: WordpressProduct[];
  lastCursor: string;
  hasNextPage: boolean;
  currentPage: number;
  maxPages: number;
}

interface State {
  data: Record<string, StateData | undefined>;
  activeKey: string;
}

type Actions = ActionTypes<typeof getFullProducts | typeof loadmoreFullProducts | typeof changeActiveKey>;

const defaultData: StateData = {
  statusRequest: 'idle',
  statusLoadmore: 'idle',
  products: [],
  lastCursor: '',
  hasNextPage: false,
  currentPage: 1,
  maxPages: 1,
};

const defaultState: State = {
  data: {},
  activeKey: '',
};

export const reducerFullProducts = createReducer<State, Actions>(defaultState, [
  handleAction('@FullProducts/changeActiveKey', ({ state, action }) => {
    return {
      ...state,
      activeKey: action.payload,
    };
  }),
  handleAction('@FullProducts/getFullProductsRequest', ({ state }) => {
    const { activeKey, data } = state;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusRequest: 'loading',
        },
      },
    };
  }),
  handleAction('@FullProducts/getFullProductsSuccess', ({ state, action }) => {
    const { activeKey, data } = state;
    const { products, hasNextPage, lastCursor, maxPages } = action.payload;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusRequest: 'success',
          products,
          hasNextPage,
          lastCursor,
          maxPages,
        },
      },
    };
  }),
  handleAction('@FullProducts/getFullProductsFailure', ({ state }) => {
    const { activeKey, data } = state;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusRequest: 'failure',
        },
      },
    };
  }),
  handleAction('@FullProducts/getFullProductsCancel', ({ state }) => {
    const { data, activeKey } = state;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusRequest: 'idle',
        },
      },
    };
  }),
  handleAction('@FullProducts/loadmoreFullProductsRequest', ({ state }) => {
    const { activeKey, data } = state;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusLoadmore: 'loading',
        },
      },
    };
  }),
  handleAction('@FullProducts/loadmoreFullProductsSuccess', ({ state, action }) => {
    const { activeKey, data } = state;
    const { products, hasNextPage, lastCursor, maxPages } = action.payload;
    return {
      ...state,
      data: {
        ...state.data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusLoadmore: 'success',
          products: (data[activeKey] ?? defaultData).products.concat(products),
          lastCursor,
          hasNextPage,
          currentPage: (data[activeKey] ?? defaultData).currentPage + 1,
          maxPages,
        },
      },
    };
  }),
  handleAction('@FullProducts/loadmoreFullProductsFailure', ({ state }) => {
    const { activeKey, data } = state;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusLoadmore: 'failure',
        },
      },
    };
  }),
  handleAction('@FullProducts/loadmoreFullProductsCancel', ({ state }) => {
    const { activeKey, data } = state;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusLoadmore: 'idle',
        },
      },
    };
  }),
]);
