import { useRef, useEffect } from 'react';

const usePrevious = <T>(value: T): T | undefined => {
  const prevValue = useRef<T>();

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return prevValue.current;
};

export default usePrevious;
