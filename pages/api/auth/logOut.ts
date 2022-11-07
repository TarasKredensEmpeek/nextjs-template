import { NextApiRequest, NextApiResponse } from 'next';

import axiosInstance from '@services/dataProvider';
import { removeTokens } from '@common/utils/helpers';
import { createApiError, NextResponseError } from '@common/utils/ssrHelpers';

const logOut = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axiosInstance.post('/auth/logOut', req.body, {
      params: req.query,
    });

    removeTokens({ req, res });

    res.status(response.status).json(response.data);
  } catch (e) {
    createApiError(res, e as NextResponseError);
  }
};

export default logOut;
