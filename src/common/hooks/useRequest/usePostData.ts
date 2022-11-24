import useAxiosRequest, { UseMethodResult } from './useAxiosRequest';

const usePostData = <D = unknown>(resource: string): UseMethodResult<D> => {
  const { handleRequest, requestState, cancelRequest } = useAxiosRequest<D>(
    resource,
    'post',
  );

  return [handleRequest, requestState, cancelRequest];
};

export default usePostData;
