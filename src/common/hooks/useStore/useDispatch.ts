import { useContext } from 'react';

import { StateContext, StateProviderValue } from '@services/stateProvider';

const useDispatch = () => {
  const { dispatch } = useContext<StateProviderValue>(StateContext);

  return dispatch;
};

export default useDispatch;
