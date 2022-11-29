import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosRequestConfig } from 'axios';

import requestInterceptor from './requestInterceptor';
import { onFulfilled, onRejected } from './responseInterceptor';

declare module 'axios' {
  export interface AxiosRequestConfig {
    req?: NextApiRequest;
    res?: NextApiResponse;
  }
}

const isClient = () => typeof window !== 'undefined';

const clientAxiosInstance = axios.create({
  baseURL: isClient() ? `${window.origin}/api` : process.env.API_URL,
} as AxiosRequestConfig);

clientAxiosInstance.interceptors.request.use(requestInterceptor);

clientAxiosInstance.interceptors.response.use(onFulfilled, onRejected);

export default clientAxiosInstance;
