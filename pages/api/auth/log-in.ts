import { NextApiRequest, NextApiResponse } from 'next';

import axiosInstance from '@services/dataProvider';
import { setTokens } from '@common/utils/helpers';
import { createApiError, NextResponseError } from '@common/utils/ssrHelpers';
import cookiesStorage, { CookieNames } from '@services/cookiesStorage';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const clientId =
      cookiesStorage.get(CookieNames.clientId, { req, res }) || '';
    const body = { ...(req.body || {}), clientId };

    const response = await axiosInstance.post('/auth/log-in', body, {
      params: req.query,
    });

    setTokens(response.data, { req, res });

    res.status(response.status).json(response.data);
  } catch (e) {
    createApiError(res, e as NextResponseError);
  }
};

export default login;
