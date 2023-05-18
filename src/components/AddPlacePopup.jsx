import React, { useState, memo } from 'react';
import PopupWithForm from './PopupWithForm';
import useClearInputs from '../hooks/useClearInputs';

const AddPlacePopup = memo(({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useClearInputs(isOpen, setName, setLink);

  function handleSubmit() {
    return onAddPlace({ name, link });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name || ''}
        onChange={handleNameChange}
        className="popup-form__input popup-form__input_type_card-name"
        type="text"
        name="name"
        id="card-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="card-name-error popup-form__input-error" />
      <input
        value={link || ''}
        onChange={handleLinkChange}
        className="popup-form__input popup-form__input_type_card-link"
        type="url"
        name="link"
        id="image-link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="image-link-error popup-form__input-error" />
    </PopupWithForm>
  );
});

export default AddPlacePopup;
