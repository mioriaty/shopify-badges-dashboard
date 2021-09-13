import { createPostMessage } from 'wiloke-react-core/utils';

export interface ParentOnMessage {
  '@InitializationPage/success': any;
  '@InitializationPage/failure': undefined;
}

export interface ParentEmitMessage {
  '@InitializationPage/request': undefined;
}

export const postmessage = createPostMessage<ParentEmitMessage, ParentOnMessage>({
  is: 'children',
});
