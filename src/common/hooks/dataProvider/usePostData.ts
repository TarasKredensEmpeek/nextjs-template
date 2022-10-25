import { useEffect, useMemo } from 'react';

import { FetchMethods } from '@common/hooks/dataProvider/useDataProvider';
import useRequest from '@common/hooks/dataProvider/useRequest';
import { IRequestOptions } from '@services/dataProvider';

const usePostData = (resource: string, options?: IRequestOptions) => {
  const { makeRequest, abortController, ...restData } = useRequest(
    FetchMethods.post,
  );

  const jsonOptions = useMemo(() => JSON.stringify(options || {}), [options]);

  useEffect(() => {
    const requestOptions = JSON.parse(jsonOptions);

    makeRequest(resource, requestOptions);

    return () => abortController.cancelRequest();
  }, [makeRequest, resource, jsonOptions, abortController]);

  return { ...restData, abortController };
};

export default usePostData;
