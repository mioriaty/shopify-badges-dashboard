import { css, Theme } from 'wiloke-react-core';

export const container = css`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  width: 60px;
  height: 60px;
  min-width: 60px;
`;

export const dot = (isSelected: boolean) => ({ colors }: Theme) => css`
  width: 16px;
  height: 16px;
  background-color: ${isSelected ? colors.primary : colors.gray6};
  position: absolute;
  border-radius: 50%;
`;

export const topLeft = css`
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

export const input = css`
  position: absolute;
  top: 2px;
  right: 2px;
  z-index: 3;
`;

export const icon = css`
  position: absolute;
  top: 0px;
  right: 4px;
  z-index: 2;
  overflow: hidden;
`;
