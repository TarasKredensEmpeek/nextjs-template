export type EventListener = <A = object>(
  eventName: string,
  ...args: A[]
) => void;

export interface EventEmitter {
  eventsMap: Map<string, any>;
  on: (event: string, callback: EventListener) => EventEmitter;
  off: (event: string) => EventEmitter;
  emit: <A>(event: string, ...a: A[]) => boolean;
}

const eventEmitter: EventEmitter = {
  // map of listed event names with list of listeners
  eventsMap: new Map(),

  // set listener for specific event
  on(event: string, callback: EventListener) {
    if (!this.eventsMap.has(event)) {
      this.eventsMap.set(event, []);
    }

    this.eventsMap.get(event).push(callback);

    return this;
  },

  // remove all listeners for specific event
  off(event: string) {
    if (!this.eventsMap.has(event)) {
      return this;
    }

    this.eventsMap.delete(event);
    return this;
  },

  // emmit specific event with params
  emit<A = object>(event: string, ...args: A[]): boolean {
    if (!this.eventsMap.has(event)) {
      return false;
    }

    // execute all callback listeners for specific event with params
    this.eventsMap
      .get(event)
      .forEach((callback: EventListener) =>
        setTimeout(() => callback.call(null, event, ...args), 0),
      );

    return true;
  },
};

export default eventEmitter;
