import React from 'react';
import logo from '../images/logo/logo.svg';
import '../index.css';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpened] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpened] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

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
    setSelectedCard(null);
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
      
      <PopupWithForm title="Обновить аватар" name="avatar" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={handleClosePopup}>
        <fieldset className="popup-form__input-group">
          <input className="popup-form__input popup-form__input_type_avatar-link" type="url" name="avatar" id="avatar" placeholder="Ссылка на картинку" required />
          <span className="avatar-error popup-form__input-error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm title="Редактировать профиль" name="profile" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={handleClosePopup}>
        <fieldset className="popup-form__input-group">
          <input className="popup-form__input popup-form__input_type_username" type="text" name="name" id="profile-name" placeholder="Ваше имя" minLength="2" maxLength="40" required />
          <span className="profile-name-error popup-form__input-error"></span>
          <input className="popup-form__input popup-form__input_type_user-description" type="text" name="about" id="profile-description" placeholder="О себе" minLength="2" maxLength="200" required />
          <span className="profile-description-error popup-form__input-error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm title="Новое место" name="new-card" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={handleClosePopup}>
        <fieldset className="popup-form__input-group">
          <input className="popup-form__input popup-form__input_type_card-name" type="text" name="name" id="card-name" placeholder="Название" minLength="2" maxLength="30" required />
          <span className="card-name-error popup-form__input-error"></span>
          <input className="popup-form__input popup-form__input_type_card-link" type="url" name="link" id="image-link" placeholder="Ссылка на картинку" required />
          <span className="image-link-error popup-form__input-error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm title="Вы уверены?" name="confirm" buttonText="Да" onClose={handleClosePopup} />

      <ImagePopup card={selectedCard} onClose={handleClosePopup} />

      <template className="cards-template">
        <li className="cards__list-item">
          <article className="card">
            <button className="card__delete-button page__link" type="button"></button>
            <a href="#" className="card__link">
              <img src="#" alt="#" className="card__image" />
            </a>
            <div className="card__description">
              <h2 className="card__title"></h2>
              <div className="card__like-container">
                <button className="card__like-button" type="button"></button>
                <p className="card__likes-counter">0</p>
              </div>
            </div>
          </article>
        </li>
      </template>

    </div>
  );
}

export default App;
