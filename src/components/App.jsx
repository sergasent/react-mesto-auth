import React, { useState, useEffect } from 'react';
import logo from '../images/logo/logo.svg';
import '../index.css';

import api from '../utils/Api';
import handleError from '../utils/utils';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const INITIAL_STATE_SELECTED_CARD = { link: '', name: '' };

  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpened] = useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpened] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(INITIAL_STATE_SELECTED_CARD);
  const [currentUser, setCurrentUser] = useState({});

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

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    handleError(
      api.changeLikeCardStatus(card._id, !isLiked)
        .then((dataCard) => {
          setCards(cards.map((c) => {
            if (c._id === card._id) return dataCard;
            return c;
          }));
        }),
    );
  }

  function handleCardDelete(card) {
    handleError(
      api.deleteCard(card._id)
        .then(() => {
          setCards(cards.filter((item) => item._id !== card._id));
        }),
    );
  }

  useEffect(() => {
    handleError(
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, cardsData]) => {
          setCurrentUser(userInfo);
          setCards(cardsData);
        }),
    );
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header logo={logo} />
          <Main
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
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
          <span className="avatar-error popup-form__input-error" />
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
          <span className="profile-name-error popup-form__input-error" />
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
          <span className="profile-description-error popup-form__input-error" />
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
          <span className="card-name-error popup-form__input-error" />
          <input
            className="popup-form__input popup-form__input_type_card-link"
            type="url"
            name="link"
            id="image-link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="image-link-error popup-form__input-error" />
        </PopupWithForm>

        <PopupWithForm
          title="Вы уверены?"
          name="confirm"
          buttonText="Да"
          onClose={handleClosePopup}
        />

        <ImagePopup card={selectedCard} onClose={handleClosePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
