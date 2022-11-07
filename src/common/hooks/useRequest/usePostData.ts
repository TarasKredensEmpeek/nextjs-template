import useAxiosRequest, { UseRequestReturn } from './useAxiosRequest';

const usePostData = <D = unknown>(
  resource: string,
): [
  UseRequestReturn['handleRequest'],
  UseRequestReturn['requestState'],
  UseRequestReturn['cancelRequest'],
] => {
  const { handleRequest, requestState, cancelRequest } = useAxiosRequest<D>(
    resource,
    'post',
  );

  return [handleRequest, requestState, cancelRequest];
};

export default usePostData;
