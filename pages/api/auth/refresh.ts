import { NextApiRequest, NextApiResponse } from 'next';

import cookiesStorage, { CookieNames } from '@services/cookiesStorage';
import axiosInstance from '@services/dataProvider';
import { setTokens } from '@common/utils/helpers';

const refresh = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const clientId = cookiesStorage.get(CookieNames.clientId) || '';
    const refreshToken = cookiesStorage.get(CookieNames.refreshToken);

    const payload = {
      clientId,
      refreshToken,
    };

    const response = await axiosInstance.post('/auth/refresh', payload, {
      params: req.query,
      headers: req.headers,
    });

    setTokens(response.data);

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

    res.status(e.response?.status).json(error);
  }
};

export default refresh;
