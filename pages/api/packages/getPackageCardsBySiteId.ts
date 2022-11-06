import { NextApiRequest, NextApiResponse } from 'next';

import axiosInstance from '@services/dataProvider';

const getPackageCardsBySiteId = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const response = await axiosInstance.get(
      '/packageService/getPackageCardsBySiteId',
      { params: req.query },
    );

    res.status(response.status).json(response.data);
  } catch (e: any) {
    const error = {
      code: e.code,
      name: e.name,
      stack: e.stack,
      status: e.status,
      message: e.message,
      statusCode: e?.response?.status,
      statusText: e?.response?.statusText,
    };

    res.status(e.response?.status).json(error);
  }
};

export default getPackageCardsBySiteId;
