import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: EditorPage__container;
  max-width: 1160px;
  background-color: ${colors.gray1};
  border: 1px solid ${colors.gray3};
  border-radius: 10px;
  display: flex;
  height: 100vh;
`;

export const editorSidebar = ({ colors }: Theme) => css`
  debug: EditorPage__editorSidebar;
  flex: 1 1 40%;
  padding: 30px;
  border-right: 1px solid ${colors.gray3};
  background-color: ${colors.light};
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: rgba(${colors.rgbLight}, 0.1);
  }
  &::-webkit-scrollbar-thumb:vertical {
    background-color: rgba(${colors.rgbDark}, 0.3);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(${colors.rgbDark}, 0.1);
  }
`;

export const preview = css`
  debug: EditorPage__preview;
  flex: 1 1 60%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
