import { IDataProvider, IRequestOptions } from './types';
import { paramsToPath, generateQuery } from './utils';
import { fetchInstance } from './fetchInstance';

export enum FetchMethods {
  get = 'getData',
  post = 'postData',
  update = 'updateData',
  delete = 'deleteData',
}

const getResource = (resource: string, options?: IRequestOptions) => {
  const { id, params, query, sort, pagination } = options || {};
  let source = resource;

  if (id) {
    source =
      source.includes(':id') && id
        ? paramsToPath(resource, { ...params, id })
        : `${resource}/${id}`;
  }

  if (query || sort || pagination) {
    source = `${source}${generateQuery({ query, sort, pagination })}`;
  }

  return source;
};

const dataProvider: IDataProvider = {
  [FetchMethods.get]: (resource: string, options?: IRequestOptions) => {
    const { signal, ...restOptions } = options || {};
    const source = getResource(resource, restOptions);

    return fetchInstance(source, { signal, method: 'GET' });
  },

  [FetchMethods.post]: (resource: string, options?: IRequestOptions) => {
    const { signal, body, ...restOptions } = options || {};

    const source = getResource(resource, restOptions);

    return fetchInstance(source, {
      signal,
      body: JSON.stringify(body),
      method: 'POST',
    });
  },

  [FetchMethods.update]: (resource: string, options?: IRequestOptions) => {
    const { signal, body, ...restOptions } = options || {};

    const source = getResource(resource, restOptions);

    return fetchInstance(source, {
      method: 'PUT',
      body: JSON.stringify(body),
      signal,
    });
  },

  [FetchMethods.delete]: (resource: string, options?: IRequestOptions) => {
    const { signal, ...restOptions } = options || {};

    const source = getResource(resource, restOptions);

    return fetchInstance(source, { method: 'DELETE', signal });
  },
};

export default dataProvider;
