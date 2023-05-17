import React, { useContext} from "react";
import api from "../utils/Api";
import Card from "./Card";
import defaultUserIcon from "../images/profile/user-default.svg";

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const { avatar, name, about} = useContext(CurrentUserContext);
  const [cards, setCards] = React.useState([]);

  const loadCards = () => api.getInitialCards("cards");

  React.useEffect(() => {
    Promise.all([loadCards()])
      .then(([cardsData]) => {
        setCards([...cardsData]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="main page__section">
      <section
        className="profile"
        aria-label="Информация о профиле пользователя"
      >
        <div className="profile__container">
          <a onClick={onEditAvatar} href="/" className="profile__avatar-link">
            <img
              src={avatar ?? defaultUserIcon}
              alt="Аватар пользователя"
              className="profile__image"
            />
          </a>
          <div className="profile__info">
            <h1 className="profile__name">{name ?? ""}</h1>
            <button
              onClick={onEditProfile}
              className="profile__edit-button page__link"
              type="button"
            ></button>
            <p className="profile__description">
              {about ?? ""}
            </p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button page__link"
          type="button"
        ></button>
      </section>

      <section className="cards" aria-label="Список изображений">
        <ul className="cards__list">
          {cards.map((item) => (
            <Card key={item._id} card={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
