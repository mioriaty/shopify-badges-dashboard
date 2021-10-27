import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { changeActiveKey, getBadges, loadmoreBadges } from '../actions/actionBadges';
import { ResponseSuccess } from '../BadgeAPI';

interface StateData {
  statusRequest: Status;
  statusLoadmore: Status;
  badges: ResponseSuccess['data']['items'];
  currentPage: number;
  maxPage: number;
}

interface State {
  data: Record<string, StateData | undefined>;
  activeKey: string;
}

type Actions = ActionTypes<typeof getBadges | typeof loadmoreBadges | typeof changeActiveKey>;

const defaultData: StateData = {
  statusRequest: 'idle',
  statusLoadmore: 'idle',
  badges: [],
  currentPage: 1,
  maxPage: 1,
};

const defaultState: State = {
  data: {},
  activeKey: '',
};

export const reducerBadges = createReducer<State, Actions>(defaultState, [
  handleAction('@Badges/changeActiveKey', ({ state, action }) => {
    return {
      ...state,
      activeKey: action.payload,
    };
  }),
  handleAction('@Badges/getBadgesRequest', ({ state }) => {
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
  handleAction('@Badges/getBadgesSuccess', ({ state, action }) => {
    const { activeKey, data } = state;
    const { badges, maxPage } = action.payload;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusRequest: 'success',
          badges,
          maxPage,
        },
      },
    };
  }),
  handleAction('@Badges/getBadgesFailure', ({ state }) => {
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
  handleAction('@Badges/getBadgesCancel', ({ state }) => {
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
  handleAction('@Badges/loadmoreBadgesRequest', ({ state }) => {
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
  handleAction('@Badges/loadmoreBadgesSuccess', ({ state, action }) => {
    const { activeKey, data } = state;
    const { badges, maxPage } = action.payload;
    return {
      ...state,
      data: {
        ...state.data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusLoadmore: 'success',
          badges: (data[activeKey] ?? defaultData).badges.concat(badges),
          currentPage: (data[activeKey] ?? defaultData).currentPage + 1,
          maxPage,
        },
      },
    };
  }),
  handleAction('@Badges/loadmoreBadgesFailure', ({ state }) => {
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
  handleAction('@Badges/loadmoreBadgesCancel', ({ state }) => {
    const { data, activeKey } = state;
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
