import React, { FC } from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { CacheProvider, EmotionCache } from '@emotion/react';

import theme from '@theme';
import AppRoot from '@pages/AppRoot';
import AuthProvider from '@services/authProvider';
import { createEmotionCache } from '@common/utils/ssrHelpers';

import '../styles/fonts.css';

interface IAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp: FC<IAppProps> = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles
            styles={{
              body: { backgroundColor: theme.palette.background.secondary },
            }}
          />
          <AppRoot />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </CacheProvider>
  );
};

export default appWithTranslation(MyApp);
