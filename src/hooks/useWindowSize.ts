import { useLayoutEffect, useState } from 'react';

export const useWindowSize = () => {
  const [height, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerHeight);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return height;
};
