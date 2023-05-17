import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const {
    name: currentName,
    about: currentAbout,
  } = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setAbout(e.target.value);
  }

  function handleSubmit() {
    return onUpdateUser({
      name,
      about,
    });
  }

  useEffect(() => {
    setName(currentName);
    setAbout(currentAbout);
  }, [currentName, currentAbout]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleNameChange}
        value={name || ''}
        className="popup-form__input popup-form__input_type_username"
        type="text"
        name="name"
        id="profile-name"
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="profile-name-error popup-form__input-error" />
      <input
        onChange={handleDescriptionChange}
        value={about || ''}
        className="popup-form__input popup-form__input_type_user-description"
        type="text"
        name="about"
        id="profile-description"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="profile-description-error popup-form__input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
