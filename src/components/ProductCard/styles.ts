import { css, Theme } from 'wiloke-react-core';

export const container = css`
  display: flex;
`;

export const productName = css`
  font-size: 15px;
  line-height: 23px;
  font-weight: 500;
`;

export const image = css`
  debug: Product-Image;
  overflow: hidden;
  margin-right: 15px;
  width: 95px;
  max-height: 70px;
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
