import get from 'lodash/get';
import { stringify, StringifyOptions } from 'query-string';

import { IRequestOptions } from './types';

interface PathParams {
  [key: string]: string;
}

export const paramsToPath = (path: string, params: PathParams): string =>
  Object.entries(params).reduce(
    (param, [key, value]) => param.replace(`:${key}`, value),
    path,
  );

const defaultStringifyOptions: StringifyOptions = {
  arrayFormatSeparator: '&',
  encode: false,
};

export function generateQuery(options: IRequestOptions): string {
  const { stringifyOptions = null, ...params } = options;

  let query = get(params, 'filter', false) ? params.filter : {};

  if (get(params, 'pagination', false)) {
    const { page = 1, perPage = 1 } = params.pagination || {};

    query = {
      ...query,
      _start: (page - 1) * perPage,
      _end: page * perPage,
    };
  }

  if (get(params, 'sort', false)) {
    const { field, order } = params.sort || {};
    query = {
      ...query,
      _sort: field,
      _order: order,
    };
  }

  if (get(params, 'ids', false)) {
    query = { ...query, ids: params.ids };
  }

  if (Object.keys(query).length) {
    return `?${stringify(query, stringifyOptions || defaultStringifyOptions)}`;
  }

  return '';
}
