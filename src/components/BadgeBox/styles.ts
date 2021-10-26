import { css, Theme } from 'wiloke-react-core';

export const container = (isActive: boolean) => ({ colors }: Theme) => css`
  debug: Badge__container;
  border-radius: 10px;
  background-color: ${colors.light};
  border: 2px solid ${isActive ? colors.primary : colors.gray2};
  cursor: pointer;
  position: relative;
  padding: 10px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 0;
    width: 100%;
    padding-top: 100%;
  }
`;

export const content = css`
  debug: Badge__content;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
