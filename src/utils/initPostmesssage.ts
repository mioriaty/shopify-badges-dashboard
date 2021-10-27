import { createPostMessage } from 'wiloke-react-core/utils';

interface AjaxOnPostMessage {
  '@InitializePage/getWPInfoRequest': WordpressInfo;
}

interface AjaxEmitPostMessage {
  '@HasPassed': {
    hasPassed: boolean;
  };
}

export const pmAjax = createPostMessage<AjaxEmitPostMessage, AjaxOnPostMessage>({
  is: 'parent',
  iframeSelector: '#badges-iframe',
});
