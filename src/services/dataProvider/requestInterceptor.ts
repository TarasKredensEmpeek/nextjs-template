import { AxiosRequestConfig } from 'axios';

import cookiesStorage, { CookieNames } from '@services/cookiesStorage';
import { decodeJwt, removeTokens } from '@common/utils/authHelpers';
import apiUrls from '@common/constants/apiUrls';

import refreshToken from './refreshToken';

let refreshPromise: Promise<undefined> | null = null;

export const getServerTimeDiff = () =>
  Number(localStorage.getItem(CookieNames.serverTimeDiff)) ?? 0;

export const isTokenAlive = (token: string) => {
  if (!token) return false;

  try {
    const decodedToken = decodeJwt(token);
    const tokenExpTime = decodedToken.exp;
    const serverTimeDiff = getServerTimeDiff();
    const currentTime = new Date().getTime() / 1000;

    return tokenExpTime - currentTime - serverTimeDiff > 60;
  } catch (e) {
    return false;
  }
};

const getConfigWithToken = (config: AxiosRequestConfig) => ({
  ...config,
  headers: {
    ...(config.headers || {}),
    Authorization: `Bearer ${cookiesStorage.get(CookieNames.accessToken)}`,
  },
});

const requestInterceptor = async (
  config: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  const accessT = cookiesStorage.get(CookieNames.accessToken);

  const isRefreshRequest = config.url === apiUrls.refreshToken;

  if (!accessT || isRefreshRequest) {
    return config;
  }

  if (isTokenAlive(accessT as string)) {
    return getConfigWithToken(config);
  }

  const refreshT = cookiesStorage.get(CookieNames.refreshToken);

  if (refreshT && !isTokenAlive(refreshT as string)) {
    removeTokens();

    return config;
  }

  try {
    refreshPromise = refreshPromise ?? refreshToken();
    await refreshPromise;
  } catch (e) {
    removeTokens();
  } finally {
    refreshPromise = null;
  }

  return getConfigWithToken(config);
};

export default requestInterceptor;
