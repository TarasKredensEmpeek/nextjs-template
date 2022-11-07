import { NextApiRequest, NextApiResponse } from 'next';

import axiosInstance from '@services/dataProvider';
import { setTokens } from '@common/utils/helpers';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axiosInstance.post('/auth/log-in', req.body, {
      params: req.query,
    });

    setTokens(response.data, { req, res });

    res.status(response.status).json(response.data);
  } catch (e: any) {
    const error = {
      code: e.code,
      name: e.name,
      stack: e.stack,
      status: e.status,
      message: e.message,
      statusCode: e.response?.status,
      statusText: e.response?.statusText,
    };

    res.status(e.response?.status || 403).json(error);
  }
};

export default login;
