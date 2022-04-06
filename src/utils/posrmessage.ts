import { ResponseSuccess as ResponseAutomaticSuccess } from 'containers/HomePage/AutomaticAPI';
import { ResponseError as ResponseBadgesError, ResponseSuccess as ResponseBadgesSuccess } from 'containers/HomePage/BadgeAPI';
import { Data, ResponseError, ResponseSuccess } from 'containers/HomePage/ProductAPI';
import { createPostMessage } from 'wiloke-react-core/utils';
import { ResponseSuccess as TagsSuccess } from 'containers/HomePage/TagsAPI';
// export const FRONTEND_URL = process.env.FRONT_END_URL || 'https://badges-dashboard.netlify.app/';
export const FRONTEND_URL = process.env.FRONT_END_URL || 'http://localhost:3000/';
import { DocumentsData } from 'containers/HomePage/DocumentAPI';
import { RecommendItem } from 'containers/HomePage/FeatureAPI';

export interface ParentOnMessage {
  '@Badges/trackingBadges/request': undefined;
  '@Document/getDocuments/request': {
    s?: string;
  };
  '@Navigation/OpenDocument': undefined;
  '@Navigation/DiemMyCuuThay': undefined;
  '@Navigation/Feedbacks': undefined;

  '@Automatic/getSubTagsRequest': undefined;
  '@Automatic/getTagsRequest': {
    searchKey: string;
  };
  '@Automatic/loadMoreTagsRequest': undefined;
  '@Automatic/sortListPostType': {
    listPostType: string[];
  };
  '@SendReview': undefined;
  '@SendPublish': {
    isNew: boolean;
  };
  '@InitializationPage/sendYoutubeLink': undefined;
  '@InitializationPage/request': undefined;
  '@Navigation/RequestFeature': undefined;
  '@UnblockFeature': undefined;
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
  '@BadgesPage/getVariantBadgesRequest': {
    id: string;
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
    productIds: string[];
  };
  '@CUDBadge/updateBadgesRequest': {
    id: string[];
    slug: string[];
    badge_id: string;
    config: any;
    productIds: string[];
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
    baseUrl: string;
    status?: 'active' | 'deactive';
    interval?: string;
    discount?: string;
    tagsSelected?: string;
    quantity?: string;
    filter?: string;
    atLeast?: string;
  };

  '@CUDAutomatic/updateAutomaticRequest': {
    id: string;
    badge_id: string;
    title: string;
    description: string;
    config: string;
    baseUrl: string;
    status?: 'active' | 'deactive';
    interval?: string;
    discount?: string;
    tagsSelected?: string;
    quantity?: string;
    filter?: string;
    atLeast?: string;
  };

  '@CUDAutomatic/deleteAutomaticRequest': {
    id: string;
    postType: string;
  };

  '@InitializationPage/getTemplate': undefined;
  '@FeaturePage/getFeature/request': undefined;
}

export interface ParentEmitMessage {
  '@Badges/trackingBadges/success': {
    maxBadges: number;
    takenBadge: number;
    message: string;
  };
  '@Badges/trackingBadges/failure': undefined;
  '@Document/getDocuments/success': {
    data: DocumentsData[];
  };
  '@Document/getDocuments/failure': undefined;

  '@Automatic/getSubTagsSuccess': {
    items: ResponseAutomaticSuccess['data']['items'];
    maxPages: ResponseAutomaticSuccess['data']['maxPages'];
  };
  '@Automatic/getSubTagsFailure': undefined;
  '@Automatic/getTagsSuccess': {
    tags: TagsSuccess['data']['items'];
    hasNextPage: boolean;
  };
  '@Automatic/loadMoreTagsSuccess': {
    tags: TagsSuccess['data']['items'];
    hasNextPage: boolean;
  };
  '@Automatic/getTagsFailure': undefined;
  '@Automatic/loadMoreTagsFailure': undefined;
  '@FeaturePage/getFeature/success': {
    data: RecommendItem[];
  };
  '@FeaturePage/getFeature/failure': undefined;
  '@GetPublish': {
    isPublish: boolean;
  };
  '@InitializationPage/sendTemplate': {
    template: 'wordpress' | 'shopify';
  };
  '@InitializationPage/getYoutubeLink': {
    youtube: string;
    tutorialsVideo: string;
  };
  '@InitializationPage/success': {
    shopDomain?: string;
    themeId?: number;
    currencyFormat: string;
    reviewUrl: string;
    feedBackMail: string;
    activeFeature: boolean;
    activeFeatureLabel: string;
    enableNewFeature: boolean;
    newFeatureContent: string;
    howItWorksLink: string;
  };
  // full products
  '@ProductPage/fullProductSuccess': {
    fullProducts: {
      items: Data[];
      hasNextPage: ResponseSuccess['data']['hasNextPage'];
      maxPages: number;
    };
  };
  '@ProductPage/fullProductFailure': {
    message: ResponseError['message'];
  };
  '@ProductPage/fullProductLoadMoreSuccess': {
    fullProducts: {
      items: Data[];
      hasNextPage: ResponseSuccess['data']['hasNextPage'];
      maxPages: number;
      currentPage: number;
    };
  };
  '@ProductPage/fullProductLoadMoreFailure': {
    message: ResponseError['message'];
  };
  // manual products
  '@ProductPage/manualProductSuccess': {
    fullProducts: {
      items: Data[];
      hasNextPage: ResponseSuccess['data']['hasNextPage'];
      maxPages: number;
    };
  };
  '@ProductPage/manualProductFailure': {
    message: ResponseError['message'];
  };
  '@ProductPage/manualProductLoadMoreSuccess': {
    fullProducts: {
      items: Data[];
      hasNextPage: ResponseSuccess['data']['hasNextPage'];
      maxPages: number;
      currentPage: number;
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
  '@BadgesPage/getVariantBadgesSuccess': {
    data: {
      items: ResponseBadgesSuccess['data']['items'];
    };
  };

  '@BadgesPage/getVariantBadgesFailure': {
    message: ResponseBadgesError['message'];
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
    message: string;
  };
  '@CUDBadge/createBadgesFailure': {
    message: string;
  };

  '@CUDBadge/updateBadgesSuccess': {
    data: Array<{ id: string; slug: string; date: string }>;
    message: string;
  };
  '@CUDBadge/updateBadgesFailure': {
    message: string;
  };

  '@CUDBadge/deleteBadgesSuccess': {
    id: string;
    message: string;
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
    description: string;
    message: string;
  };
  '@CUDAutomatic/createAutomaticFailure': {
    message: string;
  };
  '@CUDAutomatic/updateAutomaticSuccess': {
    id: string;
    description: string;
    message: string;
  };
  '@CUDAutomatic/updateAutomaticFailure': {
    message: string;
  };
  '@CUDAutomatic/deactiveAutomaticSuccess': {
    id: string;
    message: string;
  };
  '@CUDAutomatic/deactiveAutomaticFailure': {
    message: string;
  };
  '@CUDAutomatic/deleteAutomaticSuccess': {
    id: string;
    urlImage: string;
    description: string;
    message: string;
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
