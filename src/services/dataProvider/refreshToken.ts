import axiosInstance from '@services/dataProvider/index';
import apiUrls from '@common/constants/apiUrls';

const refreshToken = async (): Promise<undefined> => {
  try {
    await axiosInstance.post(apiUrls.auth.refreshToken);
    return undefined;
  } catch (err) {
    return undefined;
  }
};

export default refreshToken;
