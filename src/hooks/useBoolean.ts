import { useMemo, useState } from 'react';

type UseBooleanReturn = [
  boolean,
  { setTrue: () => void; setFalse: () => void; toggle: () => void }
];

export const useBoolean = (initialValue = false): UseBooleanReturn => {
  const [value, setValue] = useState(initialValue);

  const controls = useMemo(() => {
    return {
      setTrue: () => setValue(true),
      setFalse: () => setValue(false),
      toggle: () => setValue((prevState) => !prevState),
    };
  }, []);

  return [value, controls];
};
