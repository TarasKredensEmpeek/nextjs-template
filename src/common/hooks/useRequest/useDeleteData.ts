import useAxiosRequest, { UseRequestReturn } from './useAxiosRequest';

const useDeleteData = (
  resource: string,
): [
  UseRequestReturn['handleRequest'],
  UseRequestReturn['requestState'],
  UseRequestReturn['cancelRequest'],
] => {
  const { handleRequest, requestState, cancelRequest } = useAxiosRequest(
    resource,
    'delete',
  );

  return [handleRequest, requestState, cancelRequest];
};

export default useDeleteData;
