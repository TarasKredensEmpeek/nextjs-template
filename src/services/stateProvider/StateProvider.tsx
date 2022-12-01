import React, {
  createContext,
  useReducer,
  useMemo,
  FC,
  Dispatch,
  ReactNode,
  useCallback,
} from 'react';

import { AccountState } from '@store/account';

export type Action<P = unknown, E = unknown> = {
  type: string;
  payload?: P;
  asyncMiddleware?: (dispatch: Dispatch<Action>) => Promise<void>;
  error?: E;
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
  const [state, stateDispatch] = useReducer(reducer, initialState);

  const dispatch = useCallback(
    async (action: Action) => {
      stateDispatch(action);

      if (action.asyncMiddleware) {
        action.asyncMiddleware(dispatch);
      }
    },
    [stateDispatch],
  );

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
