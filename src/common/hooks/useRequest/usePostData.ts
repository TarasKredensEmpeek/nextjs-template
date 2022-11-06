import useAxiosRequest, { UseRequestReturn } from './useAxiosRequest';

const usePostData = (
  resource: string,
): [
  UseRequestReturn['handleRequest'],
  UseRequestReturn['requestState'],
  UseRequestReturn['cancelRequest'],
] => {
  const { handleRequest, requestState, cancelRequest } = useAxiosRequest(
    resource,
    'post',
  );

  return [handleRequest, requestState, cancelRequest];
};

export default usePostData;
