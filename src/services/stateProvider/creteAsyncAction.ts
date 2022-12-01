import { Dispatch } from 'react';

import { Action } from '@services/stateProvider/StateProvider';

interface ActionResolvers<Payload = unknown, Error = unknown> {
  onFulfill: (payload: Payload) => void;
  onReject: (error: Error) => void;
}

type ActionCb<P = unknown> = (
  payload?: P,
  actionResolver?: ActionResolvers<P>,
) => Promise<P>;

export const success = (actionType: string) => `${actionType}.success`;
export const error = (actionType: string) => `${actionType}.error`;

const creteAsyncAction = <Payload = unknown>(
  name: string,
  action: ActionCb<Payload>,
) => {
  const successActionType = success(name);
  const errorActionType = error(name);

  const actionCreator = (payload?: Payload) => ({
    payload,
    type: name,
    asyncMiddleware: async (dispatch?: Dispatch<Action>) => {
      const onFulfill = (payload: Payload) =>
        dispatch &&
        dispatch({
          type: successActionType,
          payload,
        });

      const onReject = (error: unknown) =>
        dispatch &&
        dispatch({
          type: errorActionType,
          error,
        });

      try {
        const actionResult = await action(payload, { onFulfill, onReject });

        onFulfill(actionResult);
      } catch (e) {
        onReject(e);
      }
    },
  });

  actionCreator.toString = (): string => name as string;
  actionCreator.pending = name;
  actionCreator.success = successActionType;
  actionCreator.error = errorActionType;

  return actionCreator;
};

export default creteAsyncAction;
