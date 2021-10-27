import { useEffect } from 'react';
import { createGlobalState } from 'react-use';
import { isBrowser } from 'utils/isBrowser';

const useGlobalEmail = createGlobalState<string | undefined>();
const useGlobalInitialized = createGlobalState(false);

export const useCrispChat = () => {
  const [email, setEmail] = useGlobalEmail();
  const [initialized, setInitialized] = useGlobalInitialized();

  const handleInitCrispChat = (_shopName: string) => {
    if (isBrowser) {
      window.$crisp = [];
      window.$crisp.push(['config', 'color:theme', ['green']]);
      // window.$crisp.push(['set', 'user:nickname', [shopName]]);
      // window.CRISP_WEBSITE_ID = process.env.CRISP_WEBSITE_ID || '1bbe2bd9-dded-40af-9a0a-95e3139256a5';
      window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID || '';
      const scriptEl = document.createElement('script');
      scriptEl.src = 'https://client.crisp.chat/l.js';
      scriptEl.async = true;
      document.head.appendChild(scriptEl);
      setInitialized(true);
    }
  };

  const _handleLoaded = () => {
    if (isBrowser) {
      const email = window.$crisp.get('user:email');
      setEmail(email);
    }
  };

  const _handleEmailChanged = (email: string) => {
    setEmail(email);
  };

  useEffect(() => {
    if (isBrowser) {
      if (initialized) {
        window.$crisp.push(['on', 'session:loaded', _handleLoaded]);
        window.$crisp.push(['on', 'user:email:changed', _handleEmailChanged]);
        return () => {
          window.$crisp.push(['off', 'session:loaded']);
          window.$crisp.push(['off', 'user:email:changed']);
        };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  const handleSetEmail = (email: string, shopName: string) => {
    if (isBrowser) {
      window.$crisp.push(['set', 'user:email', [email]]);
      window.$crisp.push(['set', 'user:nickname', [shopName]]);
    }
  };

  const handleReset = () => {
    if (isBrowser) {
      window.$crisp.push(['do', 'session:reset']);
    }
  };

  return {
    email,
    setEmail: handleSetEmail,
    initCrispChat: handleInitCrispChat,
    reset: handleReset,
  };
};
