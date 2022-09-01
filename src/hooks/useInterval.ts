import { useEffect, useRef } from 'react';

export const useInterval = (callback: any, delay: number) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const intervalId = setInterval(() => savedCallback.current(), 1000);

    return () => clearInterval(intervalId);
  }, [delay]);
};
