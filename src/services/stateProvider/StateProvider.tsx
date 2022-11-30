import React, {
  createContext,
  useReducer,
  useMemo,
  FC,
  Dispatch,
  ReactNode,
} from 'react';

import { AccountState } from '@store/account';

export type Action<P = unknown> = {
  type: string;
  payload?: P;
};

export type ReduceFunc<State, Payload = unknown> = (
  state: State,
  action: Action<Payload>,
) => State;

export type State = AccountState;

export interface StateProviderValue {
  state?: State;
  dispatch: Dispatch<Action>;
}

const defaultAuthState = {
  state: undefined,
  dispatch: (action: Action) => action,
};

export const StateContext = createContext<StateProviderValue>(defaultAuthState);

interface StateProviderProps {
  children: ReactNode;
  reducer: ReduceFunc<State, Action['payload']>;
  initialState: State;
}

const StateProvider: FC<StateProviderProps> = ({
  reducer,
  children,
  initialState,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
