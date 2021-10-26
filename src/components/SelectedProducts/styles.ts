import { Colors, css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: SelectedProducts-Container;
  display: flex;
  padding: 20px;
  background-color: ${colors.light};
  align-items: center;
`;

export const title = css`
  width: 50%;
  text-align: left;
  font-weight: 500;
`;

export const select = (colors: Colors) => css`
  .ant-select-selector {
    border-color: ${colors.transparent} !important;
  }
`;

export const selectOption = css`
  display: flex;
`;

export const image = css`
  max-height: 45px;
  max-width: 60px;
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  margin-right: 10px;

  img {
    object-fit: cover;
  }
`;
