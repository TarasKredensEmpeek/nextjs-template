import useAxiosRequest, { UseMethodResult } from './useAxiosRequest';

const useGetData = <D>(resource: string): UseMethodResult<D> => {
  const { handleRequest, requestState, cancelRequest } = useAxiosRequest<D>(
    resource,
    'get',
  );

  return [handleRequest, requestState, cancelRequest];
};

export default useGetData;
