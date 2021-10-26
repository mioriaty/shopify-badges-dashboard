import { css, Theme } from 'wiloke-react-core';

const HEADER_HEIGHT = 65;

export const custom = ({ colors }: Theme) => css`
  padding: 8px;

  .MainTemplate-custom__container::-webkit-scrollbar {
    width: 5px;
    border-radius: 5px;
  }

  .MainTemplate-custom__container::-webkit-scrollbar-track {
    background: ${colors.light};
    box-shadow: none !important;
    outline: none !important;
  }

  .MainTemplate-custom__container::-webkit-scrollbar-thumb {
    background: #e3e5e6;
    box-shadow: none !important;
    outline: none !important;
    border-radius: 10px;
  }

  .MainTemplate-custom__container::-webkit-scrollbar-thumb:hover {
    background: #e3e5e6;
    outline: none !important;
    box-shadow: none !important;
  }
`;

export const container = css`
  debug: MainTemplate__container;
  border-radius: 10px;
  position: relative;
  height: calc(100vh - 16px);
  display: flex;
  flex-direction: column;
  min-width: 940px;
  overflow: hidden auto;
`;

export const header = ({ colors }: Theme) => css`
  debug: MainTemplate__header;
  height: ${HEADER_HEIGHT}px;
  padding: 10px 20px;
  border-bottom: 1px solid ${colors.gray3};
`;

export const mainContent = css`
  debug: MainTemplate__mainContent;
  height: calc(100% - ${HEADER_HEIGHT}px);
  display: flex;
`;

export const sidebar = css`
  debug: MainTemplate__sidebar;
  width: 400px;
  flex-basis: 400px;
  flex-shrink: 0;
`;

export const content = css`
  debug: MainTemplate__content;
  flex: 1 1 auto;
`;
