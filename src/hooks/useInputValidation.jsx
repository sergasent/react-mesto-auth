import { useEffect, useState } from 'react';

const useInputValidation = (value, isChanged, inputRef) => {
  const [isValid, setValid] = useState(false);

  // useEffect(() => {
  //   /*  При открытии попапа isChanged === false, поэтому инпут будет считаться валидным */
  //   if (isChanged && !inputRef.current?.validity.valid) {
  //     setValid(false);
  //   } else {
  //     setValid(true);
  //   }
  // }, [value, isChanged]);

  useEffect(() => {
    if (!inputRef.current?.validity.valid) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [value, isChanged]);

  return {
    isValid,
    message: inputRef.current?.validationMessage,
  };
};

export default useInputValidation;
