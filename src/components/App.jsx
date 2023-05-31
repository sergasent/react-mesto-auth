import React, { useState, useEffect, useMemo } from 'react';
import {
  Route, Routes, useNavigate, Navigate,
} from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

import logo from '../images/logo/logo.svg';
import imgSuccessfull from '../images/infoTooltip/successful.svg';
import imgFailed from '../images/infoTooltip/failed.svg';

import api from '../utils/Api';
import handleError from '../utils/utils';
import { register, authorize, getContent } from '../utils/Auth';

import AppContext from '../contexts/AppContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import MobileBurgerMenu from './MobileBurgerMenu';

function App() {
  const INITIAL_STATE_SELECTED_CARD = { link: '', name: '' };
  const MOBILE_WIDTH = 768;

  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpened] = useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpened] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpened] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpened] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpened] = useState(false);

  const [isInfoTooltipSuccefull, setInfoTooltipSuccefull] = useState(false);
  const [selectedCard, setSelectedCard] = useState(INITIAL_STATE_SELECTED_CARD);
  const [currentUser, setCurrentUser] = useState({});
  const [runIfConfirm, setRunIfConfirm] = useState(null);
  const [headerState, setHeaderState] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isMobileView, setMobileView] = useState(window.innerWidth <= MOBILE_WIDTH);

  const navigate = useNavigate();

  const toggleShowMenu = () => setMenuVisible((isVisible) => !isVisible);

  const appContextValue = useMemo(() => (
    {
      currentUser,
      isLoggedIn,
      userEmail,
      isMenuVisible,
      isMobileView,
      toggleShowMenu,
    }
  ), [currentUser, isLoggedIn, userEmail, isMenuVisible, isMobileView]);

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
    setInfoTooltipOpened(false);
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
          setCurrentUser((currentData) => ({
            ...currentData,
            ...userData,
          }));
          closeAllPopups();
        }),
    );
  }

  function handleUpdateAvatar(data) {
    return handleError(
      api.setUserAvatar(data)
        .then((userData) => {
          setCurrentUser((currentData) => ({
            ...currentData,
            avatar: userData.avatar,
          }));
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

  function handleLogin(data) {
    return handleError(
      authorize(data)
        .then((res) => {
          if (res.token) {
            handleError(
              getContent(res.token)
                .then((userData) => {
                  setUserEmail(userData.data.email || '');
                  setLoggedIn(true);
                  navigate('/', { replace: true });
                }),
            );
          }
        }),
    );
  }

  function handleRegister(data) {
    return handleError(
      register(data)
        .then(() => {
          handleLogin(data)
            .then(() => {
              setInfoTooltipSuccefull(true);
              setInfoTooltipOpened(true);
            });
        })
        .catch((e) => {
          setInfoTooltipSuccefull(false);
          setInfoTooltipOpened(true);
          return Promise.reject(e);
        }),
    );
  }

  function handleSignOut() {
    setUserEmail('');
    setLoggedIn(false);
    setMenuVisible(false);
    localStorage.removeItem('jwt');
    navigate('/sign-in', { replace: true });
  }

  function tokenCheck() {
    const token = localStorage.getItem('jwt');
    if (token) {
      handleError(
        getContent(token)
          .then((userData) => {
            if (userData) {
              setUserEmail(userData.data.email || '');
              setLoggedIn(true);
              navigate('/', { replace: true });
            }
          }),
      );
    }
  }

  useEffect(() => {
    tokenCheck();
    handleError(
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, cardsData]) => {
          setCurrentUser(userInfo);
          setCards(cardsData);
        }),
    );

    const handleWindowResize = () => {
      setMobileView(window.innerWidth <= MOBILE_WIDTH);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <AppContext.Provider value={appContextValue}>
      <div className="page">
        <div className={`page__content ${isMenuVisible ? 'page__content_menu-visible' : ''}`}>
          <MobileBurgerMenu onSignOut={handleSignOut} />
          <Header logo={logo} headerState={headerState} isMobileView={isMobileView} />
          <Routes>
            <Route
              path="/"
              element={(
                <ProtectedRoute
                  element={Main}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onSignOut={handleSignOut}
                  fillHeader={setHeaderState}
                  isLoggedIn={isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/sign-in"
              element={(
                <Login
                  fillHeader={setHeaderState}
                  openInfoTooltip={setInfoTooltipOpened}
                  onLogin={handleLogin}
                />
              )}
            />
            <Route
              exact
              path="/sign-up"
              element={(
                <Register
                  fillHeader={setHeaderState}
                  openInfoTooltip={setInfoTooltipOpened}
                  onRegister={handleRegister}
                />
              )}
            />
            <Route path="*" element={<Navigate to="/sign-in" replace />} />
          </Routes>
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

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccessful={isInfoTooltipSuccefull}
          onClose={handleClosePopup}
          imgSuccessful={imgSuccessfull}
          imgFailed={imgFailed}
          textSuccessful="Вы успешно зарегистрировались!"
          textFailed="Что-то пошло не так! Попробуйте ещё раз."
        />

        <ImagePopup card={selectedCard} onClose={handleClosePopup} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
