import { useEffect } from 'react';

function useClearInputs(isOpen, ...setters) {
  useEffect(() => {
    setters.forEach((setter) => setter(''));
  }, [isOpen]);
}

export default useClearInputs;
