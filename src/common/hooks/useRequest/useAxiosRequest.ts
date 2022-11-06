import { useCallback, useMemo, useState } from 'react';
import { AxiosRequestConfig, AxiosError } from 'axios';
import { useRouter } from 'next/router';

import axiosInstance from '@services/dataProvider';

type Method = 'get' | 'post' | 'put' | 'delete';

type BodyRequest = AxiosRequestConfig['data' | 'params'];
type ParamsRequest = AxiosRequestConfig['params' | 'headers'];

interface UseRequestState<D> {
  data?: D | undefined;
  loading: boolean;
  error?: AxiosError | undefined;
}

export interface UseRequestReturn<D = unknown | undefined> {
  handleRequest: (
    body?: BodyRequest,
    params?: ParamsRequest,
    headers?: AxiosRequestConfig['headers'],
  ) => Promise<unknown>;
  requestState: UseRequestState<D>;
  cancelRequest: () => void;
}

const bodyLessRequestMethods = ['get', 'delete'];

const useAxiosRequest = <D = unknown | undefined>(
  resource: string,
  method: Method,
): UseRequestReturn<D> => {
  const { locale } = useRouter();
  const [data, setData] = useState<D>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);

  const controller = useMemo(() => new AbortController(), []);

  const requestState = useMemo(
    () => ({
      data,
      error,
      loading,
    }),
    [data, error, loading],
  );

  const handleRequest = useCallback(
    async (
      body: AxiosRequestConfig['data' | 'params'] = {},
      param: AxiosRequestConfig['params' | 'headers'] = {},
      headers: AxiosRequestConfig['headers'] = {},
    ) => {
      const requestConfig: AxiosRequestConfig = { signal: controller.signal };
      const isBodyLess = bodyLessRequestMethods.includes(method);
      const defaultParams = { langTag: locale, siteId: 39 };

      if (isBodyLess) {
        requestConfig.params = { ...body, ...defaultParams };
        requestConfig.headers = param;
      } else {
        requestConfig.params = { ...param, ...defaultParams };
        requestConfig.headers = headers;
      }

      const request = axiosInstance[method];

      const requestArguments = isBodyLess
        ? [resource, requestConfig]
        : [resource, body, requestConfig];

      try {
        setLoading(true);

        const response = await request(
          ...(requestArguments as [
            string,
            AxiosRequestConfig['data'] | AxiosRequestConfig,
            AxiosRequestConfig,
          ]),
        );

        setData(response.data);
        setLoading(true);
        setError(undefined);

        return response.data;
      } catch (e) {
        setError(e as AxiosError);
        setLoading(false);

        return e;
      }
    },
    [controller.signal, method, locale, resource],
  );

  const cancelRequest = () => controller.abort();

  return {
    handleRequest,
    requestState,
    cancelRequest,
  };
};

export default useAxiosRequest;
