import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';

export enum CookieNames {
  clientId = 'clientId',
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
  serverTimeDiff = 'serverTimeDiff',
}

const cookiesStorage = {
  get: (key: string, options?: OptionsType) => getCookie(key, options),

  set: <D = unknown>(key: string, data: D, options?: OptionsType) =>
    setCookie(key, data, options),

  remove: (key: string, options?: OptionsType) => deleteCookie(key, options),
};

export default cookiesStorage;
