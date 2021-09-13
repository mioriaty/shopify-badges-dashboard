import { css, Theme } from 'wiloke-react-core';

export const container = css`
  margin-bottom: 20px;
  position: relative;
`;

export const inner = css`
  position: relative;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

export const label = css`
  debug: Field_label;
  line-height: 1.4;
  margin-top: 0px;
`;

export const note = ({ colors }: Theme) => css`
  debug: Field_note;
  position: relative;
  z-index: 9;
  font-size: 13px;
  line-height: 1.4;
  margin: 0px;
  margin-left: 5px !important;
  color: ${colors.gray6};
`;

export const popover = (top: number, left: number) => ({ colors }: Theme) => css`
  position: absolute;
  top: ${top}px;
  left: ${left - 10}px;
  z-index: 999;
  transform: translateY(-100%);
  background-color: ${colors.gray8};
  color: ${colors.gray2};
  border-radius: 6px;
  padding: 8px 15px;
  width: 360px;
`;
