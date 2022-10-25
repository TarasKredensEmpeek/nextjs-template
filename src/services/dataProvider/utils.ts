import { stringify, StringifyOptions } from 'query-string';

import { IRequestOptions } from './types';

interface PathParams {
  [key: string]: string | number;
}

export const paramsToPath = (path: string, params: PathParams): string =>
  Object.entries(params).reduce(
    (param, [key, value]) => param.replace(`:${key}`, String(value)),
    path,
  );

const defaultStringifyOptions: StringifyOptions = {
  arrayFormatSeparator: '&',
  encode: false,
};

export function generateQuery(options: IRequestOptions): string {
  const { stringifyOptions = null, ...params } = options;

  let query = params.query || {};

  if (params.pagination) {
    const { page = 1, perPage = 1 } = params.pagination || {};

    query = {
      ...query,
      _start: (page - 1) * perPage,
      _end: page * perPage,
    };
  }

  if (params.sort) {
    const { field, order } = params.sort;
    query = {
      ...query,
      _sort: field,
      _order: order,
    };
  }

  if (Object.keys(query).length) {
    return `?${stringify(query, stringifyOptions || defaultStringifyOptions)}`;
  }

  return '';
}
