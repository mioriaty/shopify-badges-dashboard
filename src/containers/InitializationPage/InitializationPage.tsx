import { useGetPurchaseCode } from 'containers/LoginPage';
import { useEffect, useRef } from 'react';
import { Redirect } from 'react-router';
import { pmAjax } from 'utils/initPostmesssage';
import { useGetWordpressInfo } from '.';

export const InitializationPage = () => {
  const pmWpRequest = useRef<(() => void) | undefined>();

  const getWordpressInfo = useGetWordpressInfo();
  const getPurchaseCode = useGetPurchaseCode();

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
        currencyFormat,
      } = payload;

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
        currencyFormat,
      });

      getPurchaseCode.request({ clientSite, email, productName, purchaseCode });
    });

    return () => {
      pmWpRequest.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Redirect to="/" />;
};
