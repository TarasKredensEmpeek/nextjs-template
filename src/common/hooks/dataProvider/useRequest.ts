import { useCallback, useMemo, useState } from 'react';

import dataProvider, {
  FetchMethods,
  IRequestOptions,
} from '@services/dataProvider';

interface AbortControllerType {
  signal: AbortController['signal'];
  cancelRequest: AbortController['abort'];
}

const useRequest = <T = undefined>(method?: FetchMethods) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<unknown>(undefined);
  const [loading, setLoading] = useState(false);

  const requestMethod = useMemo(
    () => dataProvider[method || FetchMethods.get],
    [method],
  );

  const abortController: AbortControllerType = useMemo(() => {
    const controller = new AbortController();

    return {
      signal: controller.signal,
      cancelRequest: () => controller.abort(),
    };
  }, []);

  const makeRequest = useCallback(
    async (
      resource: string,
      options?: IRequestOptions,
      onSuccess?: () => void,
      onError?: () => void,
    ) => {
      if (!resource) {
        throw Error('No resource specified');
      }

      try {
        setLoading(true);

        const requestOptions = options
          ? { ...options, signal: abortController.signal }
          : { signal: abortController.signal };

        const response = await requestMethod(resource, requestOptions);

        setData(response.data);

        setLoading(false);

        if (onSuccess) {
          onSuccess();
        }
      } catch (e: unknown) {
        const error = e || { message: 'No resource Found' };
        console.error(error);

        setError(error);
        setLoading(false);

        if (onError) {
          onError();
        }
      }
    },
    [requestMethod, abortController],
  );

  return {
    data,
    error,
    loading,
    makeRequest,
    cancelRequest: abortController.cancelRequest,
  };
};

export default useRequest;
