import React, { FC } from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';

import theme from '../src/theme';
import createEmotionCache from '../utils/createEmotionCache';

interface IAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp: FC<IAppProps> = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default appWithTranslation(MyApp);
