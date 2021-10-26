import { css, Theme } from 'wiloke-react-core';

export const container = css`
  display: flex;
`;

export const productName = css`
  font-size: 15px;
  line-height: 23px;
  font-weight: 500;
`;

export const image = ({ colors }: Theme) => css`
  debug: Product-Image;
  overflow: hidden;
  margin-right: 20px;
  position: relative;
  width: 110px;
  height: 110px;
  background-color: ${colors.gray2};
`;

export const children = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const changeBadge = css`
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 4px;
  font-size: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const content = css`
  debug: Product-Content;
  align-self: center;
  flex: 1;
`;

export const action = css`
  debug: Product-Action;
`;

export const price = ({ fonts }: Theme) => css`
  font-size: 14px;
  font-family: ${fonts.secondary};
  margin-right: 8px;
`;

export const discount = ({ fonts, colors }: Theme) => css`
  font-size: 14px;
  font-family: ${fonts.secondary};
  background-color: ${colors.tertiary};
  padding: 2px 4px;
  border-radius: 4px;
  color: ${colors.light};
`;

export const salePrice = ({ colors, fonts }: Theme) => css`
  color: ${colors.gray6};
  text-decoration: line-through;
  margin-right: 8px;
  font-size: 14px;
  line-height: 20px;
  font-family: ${fonts.secondary};
`;
