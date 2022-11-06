import useAxiosRequest, { UseRequestReturn } from './useAxiosRequest';

const usePutData = (
  resource: string,
): [
  UseRequestReturn['handleRequest'],
  UseRequestReturn['requestState'],
  UseRequestReturn['cancelRequest'],
] => {
  const { handleRequest, requestState, cancelRequest } = useAxiosRequest(
    resource,
    'put',
  );

  return [handleRequest, requestState, cancelRequest];
};

export default usePutData;
