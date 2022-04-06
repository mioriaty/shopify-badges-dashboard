import { useTidioChat } from 'hooks/useTidioChat';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { View } from 'wiloke-react-core';
import { IframePage } from '../IframePage/IframePage';
import { initializationSelector } from '../InitializationPage';
import { useCreateAutomatic, useDeleteAutomatic, useGetAutomatics, useUpdateAutomatic } from './actions/actionAutomaticProducts';
import { useChangeActiveKey as useChangeActiveKeyBadges, useGetBadges, useLoadmoreBadges } from './actions/actionBadges';
import { useCreateBadge, useDeleteBadge, useUpdateBadge } from './actions/actionCUDBadge';
import { useGetDocuments } from './actions/actionDoucments';
import { useChangeActiveKey as useChangeActiveKeyFullProducts, useGetFullProducts, useLoadmoreFullProducts } from './actions/actionFullProducts';
import {
  useChangeActiveKey as useChangeActiveKeyManualProducts,
  useGetManualProducts,
  useLoadmoreManualProducts,
} from './actions/actionManualProducts';
import * as styles from './styles';

export const HomePage = () => {
  const getFullProducts = useGetFullProducts();
  const getManualProducts = useGetManualProducts();
  const getBadges = useGetBadges();
  const loadMoreBadges = useLoadmoreBadges();
  const createBadge = useCreateBadge();
  const updateBadge = useUpdateBadge();
  const getAutomatic = useGetAutomatics();
  const createAutomatic = useCreateAutomatic();
  const updateAutomatic = useUpdateAutomatic();
  const deleteAutomatic = useDeleteAutomatic();

  // const loadmoreBadges = useLoadmoreBadges();
  const deleteBadge = useDeleteBadge();
  const changeActiveKeyFullProducts = useChangeActiveKeyFullProducts();
  const changeActiveKeyManualProducts = useChangeActiveKeyManualProducts();
  const changeActiveKeyBadges = useChangeActiveKeyBadges();
  const loadmoreFullProducts = useLoadmoreFullProducts();
  const loadmoreManualProducts = useLoadmoreManualProducts();
  const getDocuments = useGetDocuments();

  // manual
  const pmFullProduct = useRef<(() => void) | undefined>();
  const pmManualProducts = useRef<(() => void) | undefined>();
  const pmGetBadges = useRef<(() => void) | undefined>();
  const pmCreateBadges = useRef<(() => void) | undefined>();
  const pmUpdateBadge = useRef<(() => void) | undefined>();
  const pmDeleteBadges = useRef<(() => void) | undefined>();
  const pmLoadMoreFull = useRef<(() => void) | undefined>();
  const pmLoadMoreManual = useRef<(() => void) | undefined>();
  const pmLoadMoreBadge = useRef<(() => void) | undefined>();

  // automatic
  const pmGetAutomatic = useRef<(() => void) | undefined>();
  const pmCreateAutomatic = useRef<(() => void) | undefined>();
  const pmUpdateAutomatic = useRef<(() => void) | undefined>();
  const pmDeleteAutomatic = useRef<(() => void) | undefined>();
  const pmInit = useRef<(() => void) | undefined>();
  const pmOpenTidio = useRef<(() => void) | undefined>();
  const pmSendReview = useRef<(() => void) | undefined>();

  // another
  const pmTemplate = useRef<(() => void) | undefined>();
  const pmGoDocument = useRef<(() => void) | undefined>();
  const pmOpenDocument = useRef<(() => void) | undefined>();

  const { tidioId } = useSelector(initializationSelector);
  const { initTidioChat } = useTidioChat(tidioId);

  const { shopDomain, themeId } = useSelector(initializationSelector);

  useEffect(() => {
    if (tidioId) {
      initTidioChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tidioId]);

  // init page
  useEffect(() => {
    pmTemplate.current = postmessage.on('@InitializationPage/getTemplate', () => {
      postmessage.emit('@InitializationPage/sendTemplate', { template: 'wordpress' });
    });

    pmInit.current = postmessage.on('@InitializationPage/request', () => {
      postmessage.emit('@InitializationPage/success', {
        shopDomain,
        themeId,
        activeFeature: true,
        activeFeatureLabel: '',
        currencyFormat: '',
        enableNewFeature: true,
        feedBackMail: '',
        howItWorksLink: '',
        reviewUrl: ' ',
        newFeatureContent: '',
      });
    });

    return () => {
      pmTemplate.current?.();
      pmInit.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // send reviews
  useEffect(() => {
    pmSendReview.current = postmessage.on('@SendReview', async () => {
      await fetchAPI.request({
        url: 'me/reviews',
        method: 'POST',
      });
    });
    return () => {
      pmSendReview.current?.();
    };
  }, []);

  // get documents
  useEffect(() => {
    pmGoDocument.current = postmessage.on('@Document/getDocuments/request', payload => {
      const { s } = payload;
      getDocuments.request({ s });
    });

    return () => {
      pmGoDocument.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // navigation
  useEffect(() => {
    pmOpenTidio.current = postmessage.on('@Navigation/RequestFeature', () => {
      window.tidioChatApi.open();
      window.tidioChatApi.messageFromVisitor('I want to request more features for Magic Badges');
    });
    pmOpenDocument.current = postmessage.on('@Navigation/OpenDocument', () => {
      window.open('https://product-badges.wiloke.com/');
    });

    return () => {
      pmOpenTidio.current?.();
      pmOpenDocument.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // automatics
  useEffect(() => {
    pmGetAutomatic.current = postmessage.on('@Automatic/getAutomaticBadgesRequest', () => {
      getAutomatic.request(undefined);
    });
    pmCreateAutomatic.current = postmessage.on('@CUDAutomatic/createAutomaticRequest', payload => {
      const {
        badge_id,
        config,
        description,
        postType,
        title,
        baseUrl,
        atLeast,
        discount,
        filter,
        interval,
        quantity,
        status,
        tagsSelected,
      } = payload;
      createAutomatic.request({
        badge_id,
        config,
        description,
        postType,
        title,
        baseUrl,
        atLeast,
        discount,
        filter,
        interval,
        quantity,
        status,
        tagSelected: tagsSelected,
      });
    });

    pmUpdateAutomatic.current = postmessage.on('@CUDAutomatic/updateAutomaticRequest', payload => {
      const { badge_id, config, description, id, title, baseUrl, atLeast, discount, filter, interval, quantity, status, tagsSelected } = payload;
      updateAutomatic.request({
        badge_id,
        config,
        description,
        id,
        title,
        baseUrl,
        atLeast,
        discount,
        filter,
        interval,
        quantity,
        status,
        tagSelected: tagsSelected,
      });
    });

    pmDeleteAutomatic.current = postmessage.on('@CUDAutomatic/deleteAutomaticRequest', payload => {
      const { id, postType } = payload;
      deleteAutomatic.request({ id, postType });
    });
    return () => {
      pmCreateAutomatic.current?.();
      pmUpdateAutomatic.current?.();
      pmDeleteAutomatic.current?.();
      pmGetAutomatic.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // products page
  useEffect(() => {
    pmFullProduct.current = postmessage.on('@ProductPage/fullProductRequest', payload => {
      const { searchKey } = payload;
      changeActiveKeyFullProducts(searchKey);
      getFullProducts.request(undefined);
    });

    pmLoadMoreFull.current = postmessage.on('@ProductPage/fullProductLoadMoreRequest', () => {
      loadmoreFullProducts.request(undefined);
    });

    pmLoadMoreManual.current = postmessage.on('@ProductPage/manualProductLoadMoreRequest', () => {
      loadmoreManualProducts.request(undefined);
    });

    pmManualProducts.current = postmessage.on('@ProductPage/manualProductRequest', payload => {
      const { searchKey } = payload;
      changeActiveKeyManualProducts(searchKey);
      getManualProducts.request(undefined);
    });

    return () => {
      pmFullProduct.current?.();
      pmLoadMoreFull.current?.();
      pmLoadMoreManual.current?.();
      pmManualProducts.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Badges
  useEffect(() => {
    pmGetBadges.current = postmessage.on('@BadgesPage/getBadgesRequest', payload => {
      const { searchKey, taxName, taxSlugs, limit } = payload;
      changeActiveKeyBadges(searchKey);
      getBadges.request({ taxName, taxSlugs, limit });
    });

    pmLoadMoreBadge.current = postmessage.on('@BadgesPage/loadMoreBadgesRequest', payload => {
      const { limit } = payload;
      loadMoreBadges.request({ limit });
    });

    pmCreateBadges.current = postmessage.on('@CUDBadge/createBadgesRequest', payload => {
      const { badge_id, config, id, slug, productIds } = payload;
      createBadge.request({ id, badge_id, config, slug, productIds });
    });

    pmUpdateBadge.current = postmessage.on('@CUDBadge/updateBadgesRequest', payload => {
      const { badge_id, config, id, slug, productIds } = payload;
      updateBadge.request({ badge_id, config, id: id, slug, productIds });
    });

    pmDeleteBadges.current = postmessage.on('@CUDBadge/deleteBadgesRequest', payload => {
      const { id } = payload;
      deleteBadge.request({ ids: [id] });
    });

    return () => {
      pmCreateBadges.current?.();
      pmUpdateBadge.current?.();
      pmDeleteBadges.current?.();
      pmGetBadges.current?.();
      pmLoadMoreBadge.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View css={styles.container}>
      <IframePage />
    </View>
  );
};
