import React, { FC } from 'react';
import Routes from 'routes';
import styleBase from 'styles/base';
import { ThemeOverrides, ThemeProvider, useStyleSheet, View } from 'wiloke-react-core';
import * as css from './styles';

export const themeOverrides: ThemeOverrides = {
  fonts: {
    primary: 'Poppins, sans-serif',
    secondary: 'Roboto, sans-serif',
    tertiary: 'Merriweather, serif',
    quaternary: 'Vibes, serif',
  },
  colors: {
    primary: '#26256C',
    secondary: '#2AB885',
    tertiary: '#F57070',
    quaternary: '#FBC473',
    light: '#FFFFFF',
    gray1: '#F8F8FC',
    gray2: '#EEEEF3',
    gray3: '#DEDEE9',
    gray4: '#D2D2E2',
    gray5: '#9E9ECC',
    gray6: '#6D6D9C',
    gray7: '#494880',
    gray8: '#26256C',
    gray9: '#17174F',
    dark: '#12151f',
  },
  nightModeColors: {
    dark: '#ffffff',
    gray9: '#fbfbfc',
    gray8: '#f3f3f6',
    gray7: '#f1f1f3',
    gray6: '#e7e7ed',
    gray5: '#9ea6ba',
    gray4: '#787f95',
    gray3: '#70778b',
    gray2: '#485273',
    gray1: '#252c41',
    light: '#202638',
  },
  cssInJs: {
    pixelToRem: false,
    devMode: true,
  },
  grid: {
    container: {
      width: 1300,
      gap: 15,
    },
    columns: {
      max: 12,
      gap: 30,
    },
    breakpoints: {
      xs: 'default',
      sm: 768,
      md: 992,
      lg: 1300,
    },
  },
};

export const CSSGlobal: FC = ({ children }) => {
  const { renderer } = useStyleSheet();
  renderer.renderStatic(styleBase);

  return <View css={css.cssGlobalWithTheme}>{children}</View>;
};

const AppContent: FC = () => {
  return (
    <ThemeProvider themeOverrides={{ ...themeOverrides }}>
      <CSSGlobal>
        <Routes />
      </CSSGlobal>
    </ThemeProvider>
  );
};

export default AppContent;
