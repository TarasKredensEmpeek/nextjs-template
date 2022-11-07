import { NextApiRequest, NextApiResponse } from 'next';

import cookiesStorage, { CookieNames } from '@services/cookiesStorage';
import axiosInstance from '@services/dataProvider';
import { setTokens } from '@common/utils/helpers';
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

    const payload = {
      clientId,
      refreshToken,
    };

    const response = await axiosInstance.post('/auth/refresh', payload, {
      params: req.query,
    });

    setTokens(response.data, { req, res });

    res.status(response.status).json(response.data);
  } catch (e) {
    createApiError(res, e as NextResponseError);
  }
};

export default refresh;
