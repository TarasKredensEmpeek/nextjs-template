import { StringifyOptions } from 'query-string';

export interface IPaginationParams {
  page: number;
  perPage: number;
}

export interface ISortingParams {
  field: string;
  order: string;
}

export interface IQueryFilterParams {
  [key: string]: string | number | string[];
}

export interface IRequestOptions extends RequestInit {
  id?: string | number;
  ids?: string[];
  body?: BodyInit;
  sort?: ISortingParams;
  query?: IQueryFilterParams;
  params?: IQueryFilterParams;
  pagination?: IPaginationParams;
  stringifyOptions?: StringifyOptions;
}

export interface IResponse<T> extends Response {
  data?: T | any;
  total?: number;
}

export type DataProviderInstance = <ResponseType>(
  resource: string,
  options?: IRequestOptions,
) => Promise<IResponse<ResponseType>>;

export interface IDataProvider {
  getData: DataProviderInstance;
  postData: DataProviderInstance;
  updateData: DataProviderInstance;
  deleteData: DataProviderInstance;
}
