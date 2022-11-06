import apiUrls from '@common/constants/apiUrls';
import axiosInstance from '@services/dataProvider';

const refreshToken = async (): Promise<undefined> => {
  try {
    await axiosInstance.post(apiUrls.refreshToken);
    return undefined;
  } catch (err) {
    return undefined;
  }
};

export default refreshToken;
