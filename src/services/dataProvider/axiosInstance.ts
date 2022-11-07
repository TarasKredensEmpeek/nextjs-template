import axios from 'axios';

import requestInterceptor from './requestInterceptor';
import { onFulfilled, onRejected } from './responseInterceptor';

const isClient = () => typeof window !== 'undefined';

const clientAxiosInstance = axios.create({
  baseURL: isClient() ? `${window.origin}/api` : process.env.API_URL,
});

clientAxiosInstance.interceptors.request.use(requestInterceptor);

clientAxiosInstance.interceptors.response.use(onFulfilled, onRejected);

export default clientAxiosInstance;
