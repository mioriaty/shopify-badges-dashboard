import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { equals } from 'ramda';
import { ResponseSuccess } from '../AutomaticAPI';
import { Params as CreateParams } from '../CreateBadgeAutomaticAPI';
import { Params as UpdateParams } from '../UpdateBadgeAutomaticAPI';
import { Params as DeleteParams } from '../DeleteBadgeAutomaticAPI';
import { createAutomatic, deleteAutomatic, getAutomatics, updateAutomatic } from '../actions/actionAutomaticProducts';

interface State {
  automatics: ResponseSuccess['data']['items'];
  statusRequest: Status;
  queueCreating: CreateParams[];
  queueUpdating: UpdateParams[];
  queueDeleting: DeleteParams[];
  queueCreateFailed: CreateParams[];
  queueUpdateFailed: UpdateParams[];
  queueDeleteFailed: DeleteParams[];
}

type Actions = ActionTypes<typeof getAutomatics | typeof createAutomatic | typeof updateAutomatic | typeof deleteAutomatic>;

const defaultState: State = {
  automatics: [],
  statusRequest: 'idle',
  queueCreating: [],
  queueUpdating: [],
  queueDeleting: [],
  queueCreateFailed: [],
  queueUpdateFailed: [],
  queueDeleteFailed: [],
};

export const reducerAutomatics = createReducer<State, Actions>(defaultState, [
  handleAction('@Automatic/getAutomaticsRequest', ({ state }) => {
    return {
      ...state,
      statusRequest: 'loading',
    };
  }),
  handleAction('@Automatic/getAutomaticsSuccess', ({ state, action }) => {
    const { automatics } = action.payload;
    return {
      ...state,
      statusRequest: 'success',
      automatics,
    };
  }),
  handleAction('@Automatic/getAutomaticsFailure', ({ state }) => {
    return {
      ...state,
      statusRequest: 'failure',
    };
  }),
  handleAction('@Automatic/getAutomaticsCancel', ({ state }) => {
    return {
      ...state,
      statusRequest: 'idle',
    };
  }),
  handleAction('@Automatic/createAutomaticsRequest', ({ state, action }) => {
    return {
      ...state,
      queueCreating: state.queueCreating.concat(action.payload),
      queueCreateFailed: state.queueCreateFailed.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@Automatic/createAutomaticsSuccess', ({ state, action }) => {
    return {
      ...state,
      queueCreating: state.queueCreating.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@Automatic/createAutomaticsFailure', ({ state, action }) => {
    return {
      ...state,
      queueCreating: state.queueCreating.filter(item => !equals(item, action.payload)),
      queueCreateFailed: state.queueCreateFailed.concat(action.payload),
    };
  }),
  handleAction('@Automatic/updateAutomaticsRequest', ({ state, action }) => {
    return {
      ...state,
      queueUpdating: state.queueUpdating.concat(action.payload),
      queueUpdateFailed: state.queueUpdateFailed.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@Automatic/updateAutomaticsSuccess', ({ state, action }) => {
    return {
      ...state,
      queueUpdating: state.queueUpdating.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@Automatic/updateAutomaticsFailure', ({ state, action }) => {
    return {
      ...state,
      queueUpdating: state.queueUpdating.filter(item => !equals(item, action.payload)),
      queueUpdateFailed: state.queueUpdateFailed.concat(action.payload),
    };
  }),
  handleAction('@Automatic/deleteAutomaticsRequest', ({ state, action }) => {
    return {
      ...state,
      queueDeleting: state.queueDeleting.concat(action.payload),
      queueDeleteFailed: state.queueDeleteFailed.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@Automatic/deleteAutomaticsSuccess', ({ state, action }) => {
    return {
      ...state,
      queueDeleting: state.queueDeleting.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@Automatic/deleteAutomaticsFailure', ({ state, action }) => {
    return {
      ...state,
      queueDeleting: state.queueDeleting.filter(item => !equals(item, action.payload)),
      queueDeleteFailed: state.queueDeleteFailed.concat(action.payload),
    };
  }),
]);
