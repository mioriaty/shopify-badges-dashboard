import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { initialization } from '../actions/actionInitializationPage';

interface State {
  statusInitialization: Status;
}

type Actions = ActionTypes<typeof initialization>;

const defaultState: State = {
  statusInitialization: 'idle',
};

export const reducerInitialization = createReducer<State, Actions>(defaultState, [
  handleAction('@InitializationPage/initializationRequest', ({ state }) => {
    return {
      ...state,
      statusInitialization: 'loading',
    };
  }),
  handleAction('@InitializationPage/initializationSucess', ({ state }) => {
    return {
      ...state,
      statusInitialization: 'success',
    };
  }),
  handleAction('@InitializationPage/initializationFailure', ({ state }) => {
    return {
      ...state,
      statusInitialization: 'failure',
    };
  }),
]);
