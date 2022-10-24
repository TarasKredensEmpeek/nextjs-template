import { useCallback, useEffect, useState } from 'react';

import eventEmitter, { EventListener } from '@services/eventEmitter';

function useEventEmitter(
  event: string,
  eventListener: EventListener,
  subscribeImmediate = true,
) {
  const [subscribed, setSubscribed] = useState(false);

  const unsubscribe = useCallback(() => {
    const inst = eventEmitter.off(event);

    setSubscribed(inst.eventsMap.has(event));
  }, [event]);

  const subscribe = useCallback(() => {
    const inst = eventEmitter.on(event, eventListener);

    setSubscribed(inst.eventsMap.has(event));
  }, [event, eventListener]);

  const handleEmit = useCallback(
    <P = object>(params?: P) => {
      eventEmitter.emit(event, params);
    },
    [event],
  );

  useEffect(() => {
    if (!subscribeImmediate) {
      return () => null;
    }

    subscribe();
    return unsubscribe;
  }, [subscribe, unsubscribe, subscribeImmediate]);

  return {
    emit: handleEmit,
    subscribe,
    unsubscribe,
    isSubscribed: subscribed,
  };
}

export default useEventEmitter;
