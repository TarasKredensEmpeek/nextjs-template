import axios from 'axios';

import requestInterceptor from './requestInterceptor';

const isClient = () => typeof window !== 'undefined';

const clientAxiosInstance = axios.create({
  baseURL: isClient() ? `${window.origin}/api` : process.env.API_URL,
});

clientAxiosInstance.interceptors.request.use(requestInterceptor);

export default clientAxiosInstance;
