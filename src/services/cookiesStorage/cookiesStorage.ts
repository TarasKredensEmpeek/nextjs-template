import * as cookiesNext from 'cookies-next';

export enum CookieNames {
  clientId = 'clientId',
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
  serverTimeDiff = 'serverTimeDiff',
}

const cookiesStorage = {
  get: (key: string) => cookiesNext.getCookie(key),

  set: <D = unknown>(key: string, data: D) => cookiesNext.setCookie(key, data),

  remove: (key: string) => cookiesNext.deleteCookie(key),
};

export default cookiesStorage;
