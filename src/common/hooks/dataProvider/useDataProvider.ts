import { useCallback } from 'react';

import dataProvider, {
  IRequestOptions,
  FetchMethods,
} from '@services/dataProvider';

const useDataProvider = () => {
  const getData = useCallback(
    (resource: string, options?: IRequestOptions) =>
      dataProvider.getData(resource, options),
    [],
  );
  const postData = useCallback(
    (resource: string, options?: IRequestOptions) =>
      dataProvider.postData(resource, options),
    [],
  );
  const updateData = useCallback(
    (resource: string, options?: IRequestOptions) =>
      dataProvider.updateData(resource, options),
    [],
  );
  const deleteData = useCallback(
    (resource: string, options?: IRequestOptions) =>
      dataProvider.deleteData(resource, options),
    [],
  );

  return {
    [FetchMethods.get]: getData,
    [FetchMethods.post]: postData,
    [FetchMethods.update]: updateData,
    [FetchMethods.delete]: deleteData,
  };
};

export default useDataProvider;
