import { NextApiRequest, NextApiResponse } from 'next';

import axiosInstance from '@services/dataProvider';
import { setTokens, removeTokens } from '@common/utils/authHelpers';
import cookiesStorage, { CookieNames } from '@services/cookiesStorage';
import { createApiError, NextResponseError } from '@common/utils/ssrHelpers';

const refresh = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const storageOptions = { req, res };

    const clientId =
      cookiesStorage.get(CookieNames.clientId, storageOptions) || '';
    const refreshToken = cookiesStorage.get(
      CookieNames.refreshToken,
      storageOptions,
    );

    const body = {
      clientId,
      refreshToken,
    };

    const response = await axiosInstance.post('/auth/refresh', body, {
      params: req.query,
    });

    setTokens(response.data, { req, res });

    res.status(response.status).json(response.data);
  } catch (e) {
    removeTokens({ req, res });
    createApiError(res, e as NextResponseError);
  }
};

export default refresh;
