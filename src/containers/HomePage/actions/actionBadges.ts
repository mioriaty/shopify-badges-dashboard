import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { ResponseSuccess } from '../BadgeAPI';

export const getBadges = createAsyncAction([
  '@Badges/getBadgesRequest',
  '@Badges/getBadgesSuccess',
  '@Badges/getBadgesFailure',
  '@Badges/getBadgesCancel',
])<{ taxSlugs?: string; taxName?: string; limit?: number }, { badges: ResponseSuccess['data']['items']; maxPage: number }, undefined>();

export const loadmoreBadges = createAsyncAction([
  '@Badges/loadmoreBadgesRequest',
  '@Badges/loadmoreBadgesSuccess',
  '@Badges/loadmoreBadgesFailure',
  '@Badges/loadmoreBadgesCancel',
])<{ limit?: number }, { badges: ResponseSuccess['data']['items']; maxPage: number }, undefined>();

export const changeActiveKey = createAction('@Badges/changeActiveKey', (payload: string) => payload);

export const useGetBadges = createDispatchAsyncAction(getBadges);
export const useLoadmoreBadges = createDispatchAsyncAction(loadmoreBadges);
export const useChangeActiveKey = createDispatchAction(changeActiveKey);
