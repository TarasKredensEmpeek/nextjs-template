// export const createHeadersFromOptions = options => {
//   const requestHeaders =
//     options.headers ||
//     new Headers({
//       Accept: 'application/json',
//     });
//   if (
//     !requestHeaders.has(headers.contentType) &&
//     !(options && (!options.method || options.method === 'GET')) &&
//     !(options && options.body && options.body instanceof FormData)
//   ) {
//     requestHeaders.set(headers.contentType, 'application/json');
//   }
//   if (options && options.body && options.body instanceof FormData) {
//     requestHeaders.delete(headers.contentType);
//   }
//   if (options.user && options.user.authenticated && options.user.token) {
//     requestHeaders.set('Authorization', options.user.token);
//   }
//
//   return requestHeaders;
// };
import { IResponse, IRequestOptions } from './types';

const { NEXT_PUBLIC_API_URL } = process.env;

export const fetchInstance = async (
  resource: string,
  options?: IRequestOptions,
): Promise<IResponse> => {
  const url = `${NEXT_PUBLIC_API_URL}/${resource}`;
  // const requestHeaders = createHeadersFromOptions(options);

  try {
    const response = await fetch(url, options || {});

    if (!response.ok) {
      return Promise.reject();
    }

    const json = await response.json();

    return {
      ...response,
      data: json,
    };
  } catch (e) {
    return Promise.reject(e);
  }
};
