import { useEffect } from 'react';

function useClearInputs({ isOpen, inputs }) {
  useEffect(() => {
    if (isOpen) {
      inputs.forEach((item) => {
        item.input.clearInput(item.clearValue);
      });
    }
  }, [isOpen]);
}

export default useClearInputs;
