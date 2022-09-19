import { StringifyOptions } from 'query-string';

export interface IPaginationParams {
  page: number;
  perPage: number;
}

export interface ISortingParams {
  field: string;
  order: string;
}

export interface IRequestOptions extends RequestInit {
  id?: string;
  ids?: string[];
  body?: BodyInit;
  sort?: ISortingParams;
  filter?: any;
  params?: any;
  pagination?: IPaginationParams;
  stringifyOptions?: StringifyOptions;
}

export interface IResponse<T> extends Response {
  data?: T | any;
  total?: number;
}

export type DataProviderInstance = <T>(
  resource: string,
  options?: IRequestOptions | undefined,
) => Promise<IResponse<T>>;

export interface IDataProvider {
  getData: DataProviderInstance;
  postData: DataProviderInstance;
  updateData: DataProviderInstance;
  deleteData: DataProviderInstance;
}
