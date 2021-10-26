import { css } from 'wiloke-react-core';

export const container = css`
  debug: ImagePreview-Container;
  max-width: 460px;
  /* height: 310px; */
  width: 100%;
  position: relative;
  overflow: hidden;
  display: block;

  margin: 0 auto 35px;
`;

export const badget = css`
  position: absolute;
  width: 30px;
`;

export const topleft = css`
  top: 0;
  left: 0;
`;

export const topRight = css`
  top: 0;
  right: 0;
`;

export const bottomLeft = css`
  bottom: 0;
  left: 0;
`;

export const bottomRight = css`
  bottom: 0;
  right: 0;
`;

export const center = css`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const image = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  max-width: 100%;
  border: 0;
  vertical-align: middle;
`;

export const imageContainer = css`
  position: relative;
  overflow: hidden;

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 0;
    padding-top: 75%;
  }
`;
