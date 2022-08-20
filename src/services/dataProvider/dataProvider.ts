import { IDataProvider, IRequestOptions, IResponse } from './types';
import { paramsToPath, generateQuery } from './utils';
import { fetchInstance } from './fetchInstance';

const dataProvider: IDataProvider = {
  getData: (
    resource: string,
    options?: IRequestOptions,
  ): Promise<IResponse> => {
    const { id, signal, ...params } = options || {};
    let source = resource;

    if (id) {
      source =
        source.includes(':id') && id
          ? paramsToPath(resource, { id })
          : `${resource}/${id}`;
    }

    if (params) {
      source = `${resource}${generateQuery(params)}`;
    }

    return fetchInstance(source, { signal, method: 'GET' });
  },

  postData: (resource: string, options?: IRequestOptions) => {
    const { signal, body, ...params } = options || {};
    let source = resource;

    if (params) {
      source = `${resource}${generateQuery(params)}`;
    }

    return fetchInstance(source, {
      signal,
      body: JSON.stringify(body),
      method: 'POST',
    });
  },

  updateData: (resource: string, options?: IRequestOptions) => {
    const { params, body } = options || {};

    const parsedResource = paramsToPath(resource, params);

    return fetchInstance(
      `${parsedResource}${generateQuery({ filter: params })}`,
      { method: 'PUT', body: JSON.stringify(body) },
    );
  },

  deleteData: (resource: string, options?: IRequestOptions) => {
    const { params, ...query } = options || {};
    const parsedResource = paramsToPath(resource, params);

    return fetchInstance(
      `${parsedResource}${generateQuery({ filter: query })}`,
      { method: 'DELETE' },
    );
  },
};

export default dataProvider;
