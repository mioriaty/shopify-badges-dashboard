import { css } from 'wiloke-react-core';

export const container = css`
  debug: IframePage-container;
  padding: 0px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  z-index: 1500;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    overflow: hidden;
  }
`;
