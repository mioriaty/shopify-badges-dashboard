import { css } from 'wiloke-react-core';

export const bounce = css`
  animation: bounce;
  transform-origin: center bottom;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
`;

export const flash = css`
  animation: flash;
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

export const zoomIn = css`
  animation: zoomIn 1.2s infinite;
  animation-fill-mode: both;
  animation-delay: 0s;
`;

export const tada = css`
  animation: tada;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
`;

export const shake = css`
  animation: shake;
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
`;

export const flip = css`
  animation: flip 1.5s infinite linear;
`;

export const container = css``;
