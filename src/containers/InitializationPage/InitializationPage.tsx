import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { pmAjax } from 'utils/initPostmesssage';
import { View } from 'wiloke-react-core';
import { initializationSelector, useGetWordpressInfo } from '.';
import * as styles from './styles';

export const InitializationPage = () => {
  const { token } = useSelector(initializationSelector);
  const pmWpRequest = useRef<(() => void) | undefined>();

  const getWordpressInfo = useGetWordpressInfo();

  useEffect(() => {
    pmWpRequest.current = pmAjax.on('@InitializePage/getWPInfoRequest', payload => {
      const {
        clientSite,
        email,
        endpointVerification,
        productName,
        purchaseCode,
        purchaseCodeLink,
        tidioId,
        token,
        url,
        youtubePreviewUrl,
      } = payload;

      console.log({ clientSite, email, endpointVerification, productName, purchaseCode, purchaseCodeLink, tidioId, token, url, youtubePreviewUrl });

      getWordpressInfo({
        clientSite,
        email,
        endpointVerification,
        productName,
        purchaseCode,
        purchaseCodeLink,
        tidioId,
        token,
        url,
        youtubePreviewUrl,
      });
    });
    return () => {
      pmWpRequest.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (token) return <Redirect to="/" />;

  return <View css={styles.container}>Initialization App</View>;
};
