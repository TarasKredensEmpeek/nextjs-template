import cookiesStorage, { CookieNames } from '@services/cookiesStorage';

export const parseJwt = (token: string) => {
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

export const setTokens = ({ AccessToken, RefreshToken, ClientId }: any) => {
  if (ClientId) {
    cookiesStorage.set(CookieNames.clientId, ClientId);
  }

  if (AccessToken) {
    cookiesStorage.set(CookieNames.accessToken, AccessToken);
  }

  if (RefreshToken) {
    cookiesStorage.set(CookieNames.refreshToken, RefreshToken);

    const decodedToken: any = parseJwt(RefreshToken);
    const tokenIatTime = decodedToken.iat;
    const currentTime = new Date().getTime() / 1000;

    cookiesStorage.set(
      CookieNames.serverTimeDiff,
      `${tokenIatTime - currentTime}`,
    );
  }
};

export const removeTokens = () => {
  cookiesStorage.remove(CookieNames.clientId);
  cookiesStorage.remove(CookieNames.accessToken);
  cookiesStorage.remove(CookieNames.refreshToken);
  cookiesStorage.remove(CookieNames.serverTimeDiff);
};
