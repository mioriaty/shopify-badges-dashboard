import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const actionSelectPageType = createAction('@HowItWorksPage/selectPageType', (type: PageType) => ({ type }));
export const useSelectPageType = createDispatchAction(actionSelectPageType);
