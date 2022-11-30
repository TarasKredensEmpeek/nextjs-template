import { Action, State as StoreState, ReduceFunc } from './StateProvider';

const getType = (n: string, a: string): string => `${n}.${a}`;

type ActionFunc = (payload: Action['payload']) => Action;

interface CaseReducer<State, Payload = never> {
  [key: string]: ReduceFunc<State, Payload>;
}

interface Options<Reducer> {
  name: string;
  reducers: Reducer;
  extraReducers?: Reducer;
}

type ReducerActions<Reducer> = {
  [Type in keyof Reducer]: ActionFunc;
};

interface CreateReducerReturn<Reducer, State> {
  reducer: ReduceFunc<State>;
  actions: ReducerActions<Reducer>;
}

const createReducer = <
  State extends StoreState = StoreState,
  CaseReducers extends CaseReducer<State> = CaseReducer<State>,
>(
  options: Options<CaseReducers>,
): CreateReducerReturn<CaseReducers, State> => {
  const { name, extraReducers = {} } = options;
  const reducers = options.reducers || {};

  const reducerNames = Object.keys(reducers);

  const actionCreators: Record<string, ActionFunc> = {};

  reducerNames.forEach(actionName => {
    const type = getType(name, actionName);
    actionCreators[actionName] = (payload?: Action['payload']) => ({
      type,
      payload,
    });
  });

  const actionReducers = Object.keys(reducers).reduce(
    (acc, actionName) => ({
      ...acc,
      [getType(name, actionName)]: reducers[actionName],
    }),
    {},
  );

  const caseReducers = { ...extraReducers, ...actionReducers } as CaseReducers;

  const reducer = (state: State, action: Action) => {
    const actionType = action.type;

    if (!actionType || !(actionType in caseReducers)) {
      return state;
    }

    const reducerCase = caseReducers[actionType] as ReduceFunc<State>;

    return reducerCase(state, action) as State;
  };

  return {
    reducer,
    actions: actionCreators as never,
  };
};

export default createReducer;
