import useAxiosRequest, { UseMethodResult } from './useAxiosRequest';

const usePutData = <D>(resource: string): UseMethodResult<D> => {
  const { handleRequest, requestState, cancelRequest } = useAxiosRequest<D>(
    resource,
    'put',
  );

  return [handleRequest, requestState, cancelRequest];
};

export default usePutData;
