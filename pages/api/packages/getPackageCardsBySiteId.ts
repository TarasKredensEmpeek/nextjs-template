import { NextApiRequest, NextApiResponse } from 'next';

import axiosInstance from '@services/dataProvider';
import { createApiError, NextResponseError } from '@common/utils/ssrHelpers';

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
  } catch (e) {
    createApiError(res, e as NextResponseError);
  }
};

export default getPackageCardsBySiteId;
