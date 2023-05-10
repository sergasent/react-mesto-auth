import React from 'react';
import logo from '../images/logo/logo.svg';
import '../index.css';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const INITIAL_STATE_SELECTED_CARD = { link: '', name: '' };

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpened] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpened] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(INITIAL_STATE_SELECTED_CARD);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpened(true);
  }

  function handleEditProfileClick() {
    setEditProfileOpened(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpened(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpened(false);
    setEditProfileOpened(false);
    setAddPlacePopupOpened(false);
    setSelectedCard(INITIAL_STATE_SELECTED_CARD);
  }

  function handleClosePopup() {
    closeAllPopups();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page">
      <div className="page__content">
        <Header logo={logo} />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>

      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={handleClosePopup}
      >
        <input
          className="popup-form__input popup-form__input_type_avatar-link"
          type="url"
          name="avatar"
          id="avatar"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="avatar-error popup-form__input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        isOpen={isEditProfilePopupOpen}
        onClose={handleClosePopup}
      >
        <input
          className="popup-form__input popup-form__input_type_username"
          type="text"
          name="name"
          id="profile-name"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="profile-name-error popup-form__input-error"></span>
        <input
          className="popup-form__input popup-form__input_type_user-description"
          type="text"
          name="about"
          id="profile-description"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="profile-description-error popup-form__input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Новое место"
        name="new-card"
        isOpen={isAddPlacePopupOpen}
        onClose={handleClosePopup}
      >
        <input
          className="popup-form__input popup-form__input_type_card-name"
          type="text"
          name="name"
          id="card-name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="card-name-error popup-form__input-error"></span>
        <input
          className="popup-form__input popup-form__input_type_card-link"
          type="url"
          name="link"
          id="image-link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="image-link-error popup-form__input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Вы уверены?"
        name="confirm"
        buttonText="Да"
        onClose={handleClosePopup}
      />

      <ImagePopup card={selectedCard} onClose={handleClosePopup} />
    </div>
  );
}

export default App;
