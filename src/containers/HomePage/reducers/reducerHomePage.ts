import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionSelectPageType } from '../actions';

type PageTypeAction = ActionTypes<typeof actionSelectPageType>;

interface PageTypeState {
  pageType: PageType;
}

const defaultState: PageTypeState = {
  pageType: 'manual',
};

export const reduceHomePage = createReducer<PageTypeState, PageTypeAction>(defaultState, [
  handleAction('@HowItWorksPage/selectPageType', ({ state, action }) => {
    const { type } = action.payload;
    return {
      ...state,
      pageType: type,
    };
  }),
]);
