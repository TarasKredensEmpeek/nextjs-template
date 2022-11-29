import { OptionsType } from 'cookies-next/lib/types';
import { AxiosRequestConfig } from 'axios';

import axiosInstance from '@services/dataProvider/index';
import apiUrls from '@common/constants/apiUrls';
import cookiesStorage, { CookieNames } from '@services/cookiesStorage';
import { setTokens } from '@common/utils/authHelpers';

const handleRefreshToken = async (opts: OptionsType): Promise<undefined> => {
  try {
    const clientId = cookiesStorage.get(CookieNames.clientId, opts);
    const refreshToken = cookiesStorage.get(CookieNames.refreshToken, opts);

    const data = { clientId, refreshToken };

    const response = await axiosInstance.post(apiUrls.auth.refreshToken, data, {
      ...opts,
    } as AxiosRequestConfig);

    if (response.data) {
      setTokens(response.data, opts);
    }

    return undefined;
  } catch (err) {
    return undefined;
  }
};

export default handleRefreshToken;
