import { useContext } from 'react';

import { StateContext, StateProviderValue } from '@services/stateProvider';

const useStore = (): StateProviderValue =>
  useContext<StateProviderValue>(StateContext);

export { default as useDispatch } from './useDispatch';
export { default as useSelector } from './useSelector';

export default useStore;
