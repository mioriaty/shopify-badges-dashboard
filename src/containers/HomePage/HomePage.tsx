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
  const pmSendPublish = useRef<(() => void) | undefined>();
  const { tidioId } = useSelector(initializationSelector);
  const { initTidioChat } = useTidioChat(tidioId);
  // const { initCrispChat } = useCrispChat();

  const { shopDomain, themeId } = useSelector(initializationSelector);
  const pmTemplate = useRef<(() => void) | undefined>();

  useEffect(() => {
    pmTemplate.current = postmessage.on('@InitializationPage/getTemplate', () => {
      postmessage.emit('@InitializationPage/sendTemplate', { template: 'wordpress' });
    });
    return () => {
      pmTemplate.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tidioId) {
      initTidioChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tidioId]);

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

  useEffect(() => {
    pmSendPublish.current = postmessage.on('@SendPublish', async () => {
      await fetchAPI.request({
        url: 'me/publish',
        method: 'POST',
      });
    });
    return () => {
      pmSendPublish.current?.();
    };
  }, []);

  useEffect(() => {
    pmOpenTidio.current = postmessage.on('@Navigation/RequestFeature', () => {
      window.tidioChatApi.open();
      window.tidioChatApi.messageFromVisitor('I want to request more features for Magic Badges');
    });
    return () => {
      pmOpenTidio.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pmInit.current = postmessage.on('@InitializationPage/request', () => {
      postmessage.emit('@InitializationPage/success', { shopDomain, themeId });
    });
    return () => {
      pmInit.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pmGetAutomatic.current = postmessage.on('@Automatic/getAutomaticBadgesRequest', () => {
      getAutomatic.request(undefined);
    });
    return () => {
      pmGetAutomatic.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pmCreateAutomatic.current = postmessage.on('@CUDAutomatic/createAutomaticRequest', payload => {
      const { badge_id, config, description, postType, title } = payload;
      createAutomatic.request({ badge_id, config, description, postType, title });
    });
    return () => {
      pmCreateAutomatic.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pmUpdateAutomatic.current = postmessage.on('@CUDAutomatic/updateAutomaticRequest', payload => {
      const { badge_id, config, description, id, title } = payload;
      updateAutomatic.request({ badge_id, config, description, id, title });
    });
    return () => {
      pmUpdateAutomatic.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pmDeleteAutomatic.current = postmessage.on('@CUDAutomatic/deleteAutomaticRequest', payload => {
      const { id, postType } = payload;
      deleteAutomatic.request({ id, postType });
    });
    return () => {
      pmDeleteAutomatic.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pmFullProduct.current = postmessage.on('@ProductPage/fullProductRequest', payload => {
      const { searchKey } = payload;
      changeActiveKeyFullProducts(searchKey);
      getFullProducts.request(undefined);
    });
    return () => {
      pmFullProduct.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pmLoadMoreFull.current = postmessage.on('@ProductPage/fullProductLoadMoreRequest', () => {
      loadmoreFullProducts.request(undefined);
    });
    return () => {
      pmLoadMoreFull.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pmLoadMoreManual.current = postmessage.on('@ProductPage/manualProductLoadMoreRequest', () => {
      loadmoreManualProducts.request(undefined);
    });
    return () => {
      pmLoadMoreManual.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pmManualProducts.current = postmessage.on('@ProductPage/manualProductRequest', payload => {
      const { searchKey } = payload;
      changeActiveKeyManualProducts(searchKey);
      getManualProducts.request(undefined);
    });
    return () => {
      pmManualProducts.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pmGetBadges.current = postmessage.on('@BadgesPage/getBadgesRequest', payload => {
      const { searchKey, taxName, taxSlugs, limit } = payload;
      changeActiveKeyBadges(searchKey);
      getBadges.request({ taxName, taxSlugs, limit });
    });
    return () => {
      pmGetBadges.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pmLoadMoreBadge.current = postmessage.on('@BadgesPage/loadMoreBadgesRequest', payload => {
      const { limit } = payload;
      loadMoreBadges.request({ limit });
    });
    return () => {
      pmLoadMoreBadge.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pmCreateBadges.current = postmessage.on('@CUDBadge/createBadgesRequest', payload => {
      const { badge_id, config, id, slug, productIds } = payload;
      createBadge.request({ id, badge_id, config, slug, productIds });
    });
    return () => {
      pmCreateBadges.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pmUpdateBadge.current = postmessage.on('@CUDBadge/updateBadgesRequest', payload => {
      const { badge_id, config, id, slug } = payload;
      updateBadge.request({ badge_id, config, id: id, slug });
    });
    return () => {
      pmUpdateBadge.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pmDeleteBadges.current = postmessage.on('@CUDBadge/deleteBadgesRequest', payload => {
      const { id } = payload;
      deleteBadge.request({ ids: [id] });
    });
    return () => {
      pmDeleteBadges.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View css={styles.container}>
      <IframePage />
    </View>
  );
};
