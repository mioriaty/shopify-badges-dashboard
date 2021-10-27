import { ResponseError, ResponseSuccess } from 'containers/HomePage/ProductAPI';
import { ResponseSuccess as ResponseBadgesSuccess, ResponseError as ResponseBadgesError } from 'containers/HomePage/BadgeAPI';
import { ResponseSuccess as ResponseAutomaticSuccess } from 'containers/HomePage/AutomaticAPI';

import { createPostMessage } from 'wiloke-react-core/utils';

export const FRONTEND_URL = 'http://localhost:3001/';

export interface ParentOnMessage {
  '@SendReview': undefined;
  '@SendPublish': undefined;

  '@InitializationPage/request': undefined;
  '@Navigation/RequestFeature': undefined;
  '@ProductPage/fullProductRequest': {
    searchKey: string;
  };
  '@ProductPage/fullProductLoadMoreRequest': undefined;
  '@ProductPage/manualProductRequest': {
    searchKey: string;
  };
  '@ProductPage/manualProductLoadMoreRequest': undefined;
  '@BadgesPage/getBadgesRequest': {
    searchKey: string;
    page: number;
    taxSlugs?: string;
    taxName?: string;
    limit?: number;
  };
  '@BadgesPage/loadMoreBadgesRequest': {
    searchKey: string;
    page: number;
    taxSlugs?: string;
    taxName?: string;
    limit?: number;
  };
  '@CUDBadge/createBadgesRequest': {
    id: string;
    slug: string[];
    badge_id: string;
    config: any;
  };
  '@CUDBadge/updateBadgesRequest': {
    id: string[];
    slug: string[];
    badge_id: string;
    config: any;
  };
  '@CUDBadge/deleteBadgesRequest': {
    id: string;
  };
  '@Automatic/getAutomaticBadgesRequest': undefined;

  // cud automatic
  '@CUDAutomatic/createAutomaticRequest': {
    postType: string;
    badge_id: string;
    title: string;
    description: string;
    config: string;
  };

  '@CUDAutomatic/updateAutomaticRequest': {
    id: string;
    badge_id: string;
    title: string;
    description: string;
    config: string;
  };

  '@CUDAutomatic/deleteAutomaticRequest': {
    id: string;
    postType: string;
  };
}

export interface ParentEmitMessage {
  '@InitializationPage/success': {
    shopDomain?: string;
    themeId?: number;
  };
  // full products
  '@ProductPage/fullProductSuccess': {
    fullProducts: {
      items: ResponseSuccess['data']['items'];
      hasNextPage: ResponseSuccess['data']['hasNextPage'];
    };
  };
  '@ProductPage/fullProductFailure': {
    message: ResponseError['message'];
  };
  '@ProductPage/fullProductLoadMoreSuccess': {
    fullProducts: {
      items: ResponseSuccess['data']['items'];
      hasNextPage: ResponseSuccess['data']['hasNextPage'];
    };
  };
  '@ProductPage/fullProductLoadMoreFailure': {
    message: ResponseError['message'];
  };
  // manual products
  '@ProductPage/manualProductSuccess': {
    fullProducts: {
      items: ResponseSuccess['data']['items'];
      hasNextPage: ResponseSuccess['data']['hasNextPage'];
    };
  };
  '@ProductPage/manualProductFailure': {
    message: ResponseError['message'];
  };
  '@ProductPage/manualProductLoadMoreSuccess': {
    fullProducts: {
      items: ResponseSuccess['data']['items'];
      hasNextPage: ResponseSuccess['data']['hasNextPage'];
    };
  };
  '@ProductPage/manualProductLoadMoreFailure': {
    message: ResponseError['message'];
  };

  // badge page
  '@BadgesPage/getBadgesSuccess': {
    data: {
      items: ResponseBadgesSuccess['data']['items'];
      maxPages: ResponseBadgesSuccess['data']['maxPage'];
    };
  };
  '@BadgesPage/getBadgesFailure': {
    message: ResponseBadgesError['message'];
  };

  '@BadgesPage/loadMoreBadgesSuccess': {
    data: {
      items: ResponseBadgesSuccess['data']['items'];
      maxPages: ResponseBadgesSuccess['data']['maxPage'];
    };
  };
  '@BadgesPage/loadMoreBadgesFailure': {
    message: ResponseBadgesError['message'];
  };

  '@CUDBadge/createBadgesSuccess': {
    data: Array<{ id: string; date?: string; slug: string }>;
  };
  '@CUDBadge/createBadgesFailure': {
    message: string;
  };

  '@CUDBadge/updateBadgesSuccess': {
    data: Array<{ id: string; slug: string; date: string }>;
  };
  '@CUDBadge/updateBadgesFailure': {
    message: string;
  };

  '@CUDBadge/deleteBadgesSuccess': {
    id: string;
  };
  '@CUDBadge/deleteBadgeFailure': {
    message: string;
  };

  // autoamtic
  '@Automatic/getAutomaticBadgesSuccess': {
    data: ResponseAutomaticSuccess['data']['items'];
  };
  '@Automatic/getAutomaticBadgesFailure': {
    message: string;
  };

  // cud automatic
  '@CUDAutomatic/createAutomaticSuccess': {
    id: string;
  };
  '@CUDAutomatic/createAutomaticFailure': {
    message: string;
  };
  '@CUDAutomatic/updateAutomaticSuccess': {
    id: string;
  };
  '@CUDAutomatic/updateAutomaticFailure': {
    message: string;
  };
  '@CUDAutomatic/deactiveAutomaticSuccess': {
    id: string;
  };
  '@CUDAutomatic/deactiveAutomaticFailure': {
    message: string;
  };
  '@CUDAutomatic/deleteAutomaticSuccess': {
    id: string;
    urlImage: string;
  };
  '@CUDAutomatic/deleteAutomaticFailure': {
    message: string;
  };
}

export const postmessage = createPostMessage<ParentEmitMessage, ParentOnMessage>({
  is: 'parent',
  iframeSelector: '#frontend-iframe',
  url: FRONTEND_URL,
});
