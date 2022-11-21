import { NextApiRequest, NextApiResponse } from 'next';

import axiosInstance from '@services/dataProvider';
import { removeTokens } from '@common/utils/authHelpers';
import cookiesStorage, { CookieNames } from '@services/cookiesStorage';
import { createApiError, NextResponseError } from '@common/utils/ssrHelpers';

const logOut = async (req: NextApiRequest, res: NextApiResponse) => {
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
    const response = await axiosInstance.post('/auth/logOut', body, {
      params: req.query,
    });

    removeTokens({ req, res });

    res.status(response.status).json(response.data);
  } catch (e) {
    createApiError(res, e as NextResponseError);
  }
};

export default logOut;
