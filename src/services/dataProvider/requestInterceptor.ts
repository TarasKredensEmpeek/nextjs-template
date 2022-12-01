import { AxiosRequestConfig } from 'axios';
import { OptionsType } from 'cookies-next/lib/types';

import cookiesStorage, { CookieNames } from '@services/cookiesStorage';
import { decodeJwt, removeTokens } from '@common/utils/authHelpers';
import apiUrls from '@common/constants/apiUrls';

import refreshToken from './refreshToken';

let refreshPromise: Promise<undefined> | null = null;

export const isTokenAlive = (token: string) => {
  if (!token) return false;

  try {
    const decodedToken = decodeJwt(token);
    const tokenExpTime = decodedToken.exp;
    const currentTime = Date.now() / 1000;

    return tokenExpTime - currentTime > 60;
  } catch (e) {
    return false;
  }
};

const getConfigWithToken = (config: AxiosRequestConfig, opts: OptionsType) => ({
  ...config,
  headers: {
    ...(config.headers || {}),
    Authorization: `Bearer ${cookiesStorage.get(
      CookieNames.accessToken,
      opts,
    )}`,
  },
});

const requestInterceptor = async (
  config: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  const opts = { req: config.req, res: config.res };
  const accessT = cookiesStorage.get(CookieNames.accessToken, opts);

  const isRefreshRequest = config.url === apiUrls.auth.refreshToken;

  if (!accessT || isRefreshRequest) {
    return config;
  }

  if (isTokenAlive(accessT as string)) {
    return getConfigWithToken(config, opts);
  }

  const refreshT = cookiesStorage.get(CookieNames.refreshToken, opts);

  if (refreshT && !isTokenAlive(refreshT as string)) {
    removeTokens(opts);

    return config;
  }

  try {
    refreshPromise = refreshPromise ?? refreshToken(opts);
    await refreshPromise;
  } catch (e) {
    removeTokens(opts);
  } finally {
    refreshPromise = null;
  }

  return getConfigWithToken(config, opts);
};

export default requestInterceptor;
