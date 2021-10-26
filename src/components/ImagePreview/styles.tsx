import { css } from 'wiloke-react-core';

export const content = css``;

export const container = css`
  debug: ImagePreview__container;
  max-width: 420px;
  max-height: 320px;
  overflow: hidden;
  margin: 0 auto 35px;
  position: relative;
  display: flex;
  justify-content: center;
`;

export const image = css`
  position: 'absolute';
  top: 0;
  left: 0;
  object-fit: 'contain';
  width: '100%';
  height: '100%';
`;

export const badget = css`
  position: absolute;
  width: 100%;
`;

export const topleft = css`
  top: 5px;
  left: 5px;
`;

export const topRight = css`
  top: 5px;
  right: 5px;
`;

export const bottomLeft = css`
  bottom: 5px;
  left: 5px;
`;

export const bottomRight = css`
  bottom: 5px;
  right: 5px;
`;

export const center = css`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
