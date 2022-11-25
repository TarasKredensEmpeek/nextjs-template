import { OptionsType } from 'cookies-next/lib/types';

import cookiesStorage, { CookieNames } from '@services/cookiesStorage';

interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  clientId: string;
}

export interface DecodedTokenData {
  emailAddress: string;
  firstName: string;
  lastName: string;
  clientId: string;
  hash: string;
  nbf: number;
  exp: number;
  iat: number;
}

export const decodeJwt = (token: string): DecodedTokenData => {
  const base64String = token.split('.')[1];

  if (typeof window === 'undefined') {
    return JSON.parse(Buffer.from(base64String, 'base64').toString('ascii'));
  }

  const base64 = base64String.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

export const setTokens = (
  { clientId, accessToken, refreshToken }: AuthResponseData,
  options?: OptionsType,
) => {
  if (clientId) {
    cookiesStorage.set(CookieNames.clientId, clientId, options);
  }

  if (accessToken) {
    cookiesStorage.set(CookieNames.accessToken, accessToken, options);
  }

  if (refreshToken) {
    cookiesStorage.set(CookieNames.refreshToken, refreshToken, options);

    const decodedToken = decodeJwt(refreshToken);
    const tokenIatTime = decodedToken.iat;
    const currentTime = new Date().getTime() / 1000;

    cookiesStorage.set(
      CookieNames.serverTimeDiff,
      `${tokenIatTime - currentTime}`,
      options,
    );
  }
};

export const removeTokens = (options?: OptionsType) => {
  cookiesStorage.remove(CookieNames.clientId, options);
  cookiesStorage.remove(CookieNames.accessToken, options);
  cookiesStorage.remove(CookieNames.refreshToken, options);
  cookiesStorage.remove(CookieNames.serverTimeDiff, options);
};
