import { AxiosRequestConfig } from 'axios';
import { OptionsType } from 'cookies-next/lib/types';

import cookiesStorage, { CookieNames } from '@services/cookiesStorage';
import { decodeJwt, removeTokens } from '@common/utils/authHelpers';
import apiUrls from '@common/constants/apiUrls';

import refreshToken from './refreshToken';

let refreshPromise: Promise<undefined> | null = null;

export const getServerTimeDiff = (opts: OptionsType) =>
  Number(cookiesStorage.get(CookieNames.serverTimeDiff, opts)) ?? 0;

export const isTokenAlive = (token: string, opts: OptionsType) => {
  if (!token) return false;

  try {
    const decodedToken = decodeJwt(token);
    const tokenExpTime = decodedToken.exp;
    const serverTimeDiff = getServerTimeDiff(opts);
    const currentTime = new Date().getTime() / 1000;

    return tokenExpTime - currentTime - serverTimeDiff > 60;
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

  if (isTokenAlive(accessT as string, opts)) {
    return getConfigWithToken(config, opts);
  }

  const refreshT = cookiesStorage.get(CookieNames.refreshToken, opts);

  if (refreshT && !isTokenAlive(refreshT as string, opts)) {
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
