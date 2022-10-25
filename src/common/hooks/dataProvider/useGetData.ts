import { useEffect, useMemo } from 'react';

import useRequest from '@common/hooks/dataProvider/useRequest';
import { IRequestOptions } from '@services/dataProvider';

const useGetData = (resource: string, options?: IRequestOptions) => {
  const { makeRequest, cancelRequest, ...restData } = useRequest();

  const jsonOptions = useMemo(() => JSON.stringify(options || {}), [options]);

  useEffect(() => {
    const requestOptions = JSON.parse(jsonOptions);

    makeRequest(resource, requestOptions);

    return () => cancelRequest();
  }, [makeRequest, resource, jsonOptions, cancelRequest]);

  return { ...restData, cancelRequest };
};

export default useGetData;
