import useAxiosRequest, { UseRequestReturn } from './useAxiosRequest';

const useGetData = (
  resource: string,
): [
  UseRequestReturn['handleRequest'],
  UseRequestReturn['requestState'],
  UseRequestReturn['cancelRequest'],
] => {
  const { handleRequest, requestState, cancelRequest } = useAxiosRequest(
    resource,
    'get',
  );

  return [handleRequest, requestState, cancelRequest];
};

export default useGetData;
