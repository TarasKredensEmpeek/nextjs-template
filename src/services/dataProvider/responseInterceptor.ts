import { AxiosResponse } from 'axios';

import deCapitalizeProperties from './decapitlize';

export const onFulfilled = (resp: AxiosResponse) => {
  const response = { ...resp };
  response.data = deCapitalizeProperties<AxiosResponse['data']>(resp.data);

  return response;
};

export const onRejected = (resp: AxiosResponse) => resp;
