import { createPostMessage } from 'wiloke-react-core/utils';
import { ResponseSuccess as ResponseProducts } from 'containers/HomePage/ProductAPI';
import { ResponseSuccess as ResponseManualBadges } from 'containers/HomePage/BadgeAPI';
import { ResponseSuccess as ResponseCreateManualBadges } from 'containers/HomePage/CreateBadgeAPI';
import { ResponseSuccess as ResponseUpdateManualBadges } from 'containers/HomePage/UpdateBadgeAPI';
import { ResponseSuccess as ResponseDeleteManualBadges } from 'containers/HomePage/DeleteBadgeAPI';
import { ResponseSuccess as ResponseAutomatics } from 'containers/HomePage/AutomaticAPI';
import { ResponseSuccess as ResponseSortAutomaticAPI } from 'containers/HomePage/SortAutomaticAPI';
import { ResponseSuccess as ResponseCreateBadgeAutomaticAPI } from 'containers/HomePage/CreateBadgeAutomaticAPI';
import { ResponseSuccess as ResponseDeleteBadgeAutomaticAPI } from 'containers/HomePage/DeleteBadgeAutomaticAPI';
import { ResponseSuccess as ResponseUpdateBadgeAutomaticAPI } from 'containers/HomePage/UpdateBadgeAutomaticAPI';
import { DocumentsResponse } from 'containers/HomePage/DocumentAPI';

interface AjaxOnPostMessage {
  '@InitializePage/getWPInfoRequest': WordpressInfo;

  // FULL PRODUCTS
  'getFullProducts/success': ResponseProducts;
  'getFullProducts/failure': undefined;

  'loadMoreFullProducts/success': ResponseProducts;
  'loadMoreFullProducts/failure': undefined;

  // MANUAL PRODUCTS
  'getManualProducts/success': ResponseProducts;
  'getManualProducts/failure': undefined;

  'loadMoreManualProducts/success': ResponseProducts;
  'loadMoreManualProducts/failure': undefined;

  // BADGES
  'getManualBadges/success': ResponseManualBadges;
  'getManualBadges/failure': undefined;

  'loadMoreManualBadges/success': ResponseManualBadges;
  'loadMoreManualBadges/failure': undefined;

  'createManualBadges/success': ResponseCreateManualBadges;
  'createManualBadges/failure': undefined;

  'updateManualBadges/success': ResponseUpdateManualBadges;
  'updateManualBadges/failure': undefined;

  'deleteManualBadges/success': ResponseDeleteManualBadges;
  'deleteManualBadges/failure': undefined;

  // AUTOMATICS
  'getAutomatics/success': ResponseAutomatics;
  'getAutomatics/failure': undefined;

  'sortAutomatics/success': ResponseSortAutomaticAPI;
  'sortAutomatics/failure': undefined;

  'createBadgeAutomatic/success': ResponseCreateBadgeAutomaticAPI;
  'createBadgeAutomatic/failure': undefined;

  'updateBadgeAutomatic/success': ResponseUpdateBadgeAutomaticAPI;
  'updateBadgeAutomatic/failure': undefined;

  'deleteBadgeAutomatic/success': ResponseDeleteBadgeAutomaticAPI;
  'deleteBadgeAutomatic/failure': undefined;

  'getDocuments/success': DocumentsResponse;
  'getDocuments/failure': undefined;
}

interface AjaxEmitPostMessage {
  '@HasPassed': {
    hasPassed: boolean;
  };

  // FULL PRODUCTS
  'getFullProducts/request': {
    s?: string;
  };
  'loadMoreFullProducts/request': {
    s?: string;
    page: number;
  };

  // MANUAL PRODUCTS
  'getManualProducts/request': {
    s?: string;
  };
  'loadMoreManualProducts/request': {
    s?: string;
    page: number;
  };

  // MANUAL BADGES
  'getManualBadges/request': {
    s?: string;
    taxName?: string;
    taxSlugs?: string;
    limit?: number;
  };

  'loadMoreManualBadges/request': {
    s?: string;
    page: number;
    limit?: number;
  };

  'createManualBadges/request': {
    badgeUrl: string;
    config: string;
    slugs: string;
    productIDs: string;
  };

  'updateManualBadges/request': {
    badgeUrl: string;
    config: string;
    slugs: string;
    productIDs: string;
    ids: string;
  };

  'deleteManualBadges/request': {
    ids: string;
  };

  // AUTOMATICS
  'getAutomatics/request': undefined;

  'sortAutomatics/request': {
    priority: string;
  };

  'createBadgeAutomatic/request': {
    badgeUrl: string;
    badge_id: string;
    config: string;
    description: string;
    postType: string;
    title: string;
    status?: string;
    interval?: string;
    discount?: string;
    tagSelected?: string;
    quantity?: string;
    atLeast?: string;
    filter?: string;
  };

  'updateBadgeAutomatic/request': {
    badgeUrl: string;
    badge_id: string;
    config: string;
    description: string;
    title: string;
    status?: string;
    interval?: string;
    discount?: string;
    tagSelected?: string;
    quantity: string;
    atLeast: string;
    filter: string;
    id: string;
  };

  'deleteBadgeAutomatic/request': {
    postType: string;
    id: string;
  };

  'getDocuments/request': {
    s?: string;
  };
}

export const pmAjax = createPostMessage<AjaxEmitPostMessage, AjaxOnPostMessage>({
  is: 'parent',
  iframeSelector: '#badges-iframe',
});
