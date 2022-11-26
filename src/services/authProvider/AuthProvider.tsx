import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
  FC,
  ReactNode,
} from 'react';
import { AxiosResponse } from 'axios';

import cookiesStorage, {
  CookieNames,
} from '@services/cookiesStorage/cookiesStorage';
import axiosInstance from '@services/dataProvider';
import { AuthLoginData, AuthRegisterData } from '@/types/auth';
import { decodeJwt, DecodedTokenData } from '@common/utils/authHelpers';

interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  clientId: string;
}

type AuthResponse = AxiosResponse<AuthResponseData>;

export type AuthProviderStateKeys =
  | 'user'
  | 'loading'
  | 'isAuthorized'
  | 'login'
  | 'logout'
  | 'register';

type AuthProvideFunc<D> = (d: D) => Promise<void>;

export interface AuthProviderState {
  user: DecodedTokenData | null;
  loading: boolean;
  isAuthorized: boolean | null;
  register: AuthProvideFunc<AuthRegisterData>;
  login: AuthProvideFunc<AuthLoginData>;
  logout: () => Promise<void>;
}

const defaultAuthState: AuthProviderState = {
  user: null,
  loading: false,
  isAuthorized: false,
  register: async () => undefined,
  login: async () => undefined,
  logout: async () => undefined,
};

export const AuthContext = createContext<AuthProviderState>(defaultAuthState);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<DecodedTokenData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setAuthorized] = useState<boolean | null>(null);

  const readTokens = useCallback(() => {
    const access = cookiesStorage.get(CookieNames.accessToken);

    setAuthorized(!!access);

    if (access) {
      const userData = decodeJwt(access as string);
      setUser(userData);
    }
  }, []);

  const register = useCallback(async (data: AuthRegisterData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post<AuthRegisterData, AuthResponse>(
        '/auth/register',
        data,
      );
      const userData = decodeJwt(response.data.accessToken);
      setUser(userData);
      setAuthorized(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (data: AuthLoginData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post<AuthLoginData, AuthResponse>(
        '/auth/logIn',
        data,
      );
      const userData = decodeJwt(response.data.accessToken);
      setUser(userData);
      setAuthorized(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await axiosInstance.post<undefined, AuthResponse>('/auth/logOut');
      setUser(null);
      setAuthorized(false);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    readTokens();
  }, [readTokens]);

  const value = useMemo(
    () => ({
      isAuthorized,
      loading,
      user,
      register,
      login,
      logout,
    }),
    [isAuthorized, loading, login, logout, register, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
