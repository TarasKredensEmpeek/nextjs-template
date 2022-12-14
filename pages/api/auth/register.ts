import { NextApiRequest, NextApiResponse } from 'next';

import axiosInstance from '@services/dataProvider';
import { setTokens } from '@common/utils/authHelpers';
import { createApiError, NextResponseError } from '@common/utils/ssrHelpers';

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axiosInstance.post('/auth/register', req.body, {
      params: req.query,
    });

    setTokens(response.data, { req, res });

    res.status(response.status).json(response.data);
  } catch (e) {
    createApiError(res, e as NextResponseError);
  }
};

export default register;
