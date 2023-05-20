import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onSubmit }) {
  const isFormValid = true;
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      isValid={isFormValid}
    />
  );
}

export default ConfirmPopup;
