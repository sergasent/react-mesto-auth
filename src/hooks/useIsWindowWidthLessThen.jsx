import { useEffect, useState } from 'react';

const useIsWindowWidthLessThen = (width) => {
  const [isWidthLess, setWidthLess] = useState(false);

  useEffect(() => {
    const compareWidthes = () => {
      if (window.innerWidth < width) {
        setWidthLess(true);
        return;
      }
      setWidthLess(false);
    };

    window.addEventListener('resize', compareWidthes);
    return () => window.removeEventListener('resize', compareWidthes);
  }, []);
  return isWidthLess;
};

export default useIsWindowWidthLessThen;
