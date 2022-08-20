import { useCallback } from 'react';

import dataProvider from './dataProvider';
import { IRequestOptions } from './types';

const useDataProvider = (resource: string) => {
  const getData = useCallback(
    (options?: IRequestOptions) => dataProvider.getData(resource, options),
    [resource],
  );
  const postData = useCallback(
    (options?: IRequestOptions) => dataProvider.postData(resource, options),
    [resource],
  );
  const updateData = useCallback(
    (options?: IRequestOptions) => dataProvider.updateData(resource, options),
    [resource],
  );
  const deleteData = useCallback(
    (options?: IRequestOptions) => dataProvider.deleteData(resource, options),
    [resource],
  );

  return {
    getData,
    postData,
    updateData,
    deleteData,
  };
};

export default useDataProvider;
