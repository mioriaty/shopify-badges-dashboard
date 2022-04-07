import { Login, useGetPurchaseCode } from 'containers/LoginPage';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { pmAjax } from 'utils/initPostmesssage';
import { initializationSelector, useGetWordpressInfo } from '.';

export const InitializationPage = () => {
  const { token } = useSelector(initializationSelector);
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
      });

      getPurchaseCode.request({ clientSite, email, productName, purchaseCode });
    });

    return () => {
      pmWpRequest.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!token) return <Login />;

  return <Redirect to="/" />;
};
