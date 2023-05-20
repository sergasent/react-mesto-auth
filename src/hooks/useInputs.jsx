import { useState } from 'react';

const useInputs = (inputs, setFormValid) => {
  const [formValues, setFormValues] = useState(inputs);
  const [validState, setValidState] = useState({});

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setValidState({
      ...validState,
      [name]: evt.target.validationMessage,
    });
    setFormValid(evt.target.closest('form').checkValidity());
  }

  function refreshForm(refreshInputs) {
    setFormValues({ ...refreshInputs });
    setValidState({});
  }

  return {
    formValues,
    validState,
    handleChange,
    refreshForm,
  };
};

export default useInputs;
