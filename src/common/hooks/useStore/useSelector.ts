import { useContext } from 'react';

import {
  State,
  StateProviderValue,
  StateContext,
} from '@services/stateProvider';

const useSelector = (selector?: (state?: State) => Partial<State> | State) => {
  const { state } = useContext<StateProviderValue>(StateContext);

  if (!selector) {
    return state;
  }

  return selector(state);
};

export default useSelector;
