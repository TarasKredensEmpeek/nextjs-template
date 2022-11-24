import useAxiosRequest, { UseMethodResult } from './useAxiosRequest';

const useDeleteData = <D = unknown>(resource: string): UseMethodResult<D> => {
  const { handleRequest, requestState, cancelRequest } = useAxiosRequest<D>(
    resource,
    'delete',
  );

  return [handleRequest, requestState, cancelRequest];
};

export default useDeleteData;
