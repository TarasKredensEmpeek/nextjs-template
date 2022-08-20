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

export interface IResponse extends Response {
  data?: any;
}

export type DataProviderInstance = (
  resource: string,
  options?: IRequestOptions | undefined,
) => Promise<IResponse>;

export interface IDataProvider {
  getData: DataProviderInstance;
  postData: DataProviderInstance;
  updateData: DataProviderInstance;
  deleteData: DataProviderInstance;
}
