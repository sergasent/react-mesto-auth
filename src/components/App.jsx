import React, { useState, useEffect } from 'react';
import logo from '../images/logo/logo.svg';

import api from '../utils/Api';
import handleError from '../utils/utils';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';

function App() {
  const INITIAL_STATE_SELECTED_CARD = { link: '', name: '' };

  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpened] = useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpened] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpened] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(INITIAL_STATE_SELECTED_CARD);
  const [currentUser, setCurrentUser] = useState({});
  const [runIfConfirm, setRunIfConfirm] = useState(null);

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
    setConfirmPopupOpened(false);
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
          setCards(cards.map((cardItem) => {
            if (cardItem._id === card._id) return dataCard;
            return cardItem;
          }));
        }),
    );
  }

  function handleCardDelete(card) {
    setConfirmPopupOpened(true);

    //  Следующая строка отняла несколько часов и пару тысяч нервных клеток :)
    const delFunc = () => () => handleError(
      api.deleteCard(card._id)
        .then(() => {
          setCards(cards.filter((item) => item._id !== card._id));
          closeAllPopups();
        }),
    );

    setRunIfConfirm(delFunc);
  }

  function onUpdateUser(data) {
    return handleError(
      api.setUserInfo(data)
        .then((userData) => {
          setCurrentUser(userData);
          closeAllPopups();
        }),
    );
  }

  function handleUpdateAvatar(data) {
    return handleError(
      api.setUserAvatar(data)
        .then((userData) => {
          setCurrentUser({
            ...currentUser,
            avatar: userData.avatar,
          });
          closeAllPopups();
        }),
    );
  }

  function handleAddPlaceSubmit(data) {
    return handleError(
      api.addCard(data)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        }),
    );
  }

  function handleConfirmSubmit() {
    return runIfConfirm();
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

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleClosePopup}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleClosePopup}
          onUpdateUser={onUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleClosePopup}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={handleClosePopup}
          onSubmit={handleConfirmSubmit}
        />

        <ImagePopup card={selectedCard} onClose={handleClosePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
