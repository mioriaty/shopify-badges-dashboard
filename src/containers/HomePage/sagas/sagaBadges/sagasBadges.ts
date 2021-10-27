import { watchGetBadges, watchGetBadgesCancel } from './watchGetBadges';
import { watchloadmoreBadges, watchloadmoreBadgesCancel } from './watchLoadmoreBadges';

export const sagasBadges = [watchGetBadges, watchGetBadgesCancel, watchloadmoreBadges, watchloadmoreBadgesCancel];
