import logo from '../images/logo/logo.svg';
import '../index.css';

function App() {
  return (
    <div className="root">
      <div className="page">
        <header className="header page__section">
          <img src={logo} alt="Mesto Russia" lang="en" className="logo" />
        </header>

        <main className="main page__section">
          <section className="profile" aria-label="Информация о профиле пользователя">
            <div className="profile__container">
              <a href="#" className="profile__avatar-link"><img src="#" alt="Аватар пользователя" className="profile__image" /></a>
              <div className="profile__info">
                <h1 className="profile__name">Загрузка данных...</h1>
                <button className="profile__edit-button root__link" type="button"></button>
                <p className="profile__description">Загрузка данных...</p>
              </div>
            </div>
            <button className="profile__add-button root__link" type="button"></button>
          </section>

          <section className="cards" aria-label="Список изображений">
            <ul className="cards__list">

            </ul>
          </section>
        </main>

        <footer className="footer page__section">
          <p className="footer__copyright">&copy; 2020 Mesto Russia</p>
        </footer>
      </div>

      <div className="popup popup_type_profile">
        <div className="popup__container">

          <h2 className="popup__title">Редактировать профиль</h2>
          <form className="popup-form popup-form_type_profile-form" name="profile-form" method="post" action="/" novalidate>
            <fieldset className="popup-form__input-group">
              <input className="popup-form__input popup-form__input_type_username" type="text" name="name" id="profile-name" placeholder="Ваше имя" minlength="2" maxlength="40" required />
              <span className="profile-name-error popup-form__input-error"></span>
              <input className="popup-form__input popup-form__input_type_user-description" type="text" name="about" id="profile-description" placeholder="О себе" minlength="2" maxlength="200" required />
              <span className="profile-description-error popup-form__input-error"></span>
            </fieldset>
            <button className="popup__button popup-form__button" type="submit">Сохранить</button>
          </form>

          <button className="popup__close-button root__link" type="button"></button>
        </div>
      </div>

      <div className="popup popup_type_avatar">
        <div className="popup__container">

          <h2 className="popup__title">Обновить аватар</h2>
          <form className="popup-form popup-form_type_avatar-form" name="avatar-form" method="post" action="/" novalidate>
            <fieldset className="popup-form__input-group">
              <input className="popup-form__input popup-form__input_type_avatar-link" type="url" name="avatar" id="avatar" placeholder="Ссылка на картинку" required />
              <span className="avatar-error popup-form__input-error"></span>
            </fieldset>
            <button className="popup__button popup-form__button" type="submit">Сохранить</button>
          </form>

          <button className="popup__close-button root__link" type="button"></button>
        </div>
      </div>

      <div className="popup popup_type_new-card">
        <div className="popup__container">

          <h2 className="popup__title">Новое место</h2>
          <form className="popup-form popup-form_type_new-card-form" name="new-card" method="post" action="/" novalidate>
            <fieldset className="popup-form__input-group">
              <input className="popup-form__input popup-form__input_type_card-name" type="text" name="name" id="card-name" placeholder="Название" minlength="2" maxlength="30" required />
              <span className="card-name-error popup-form__input-error"></span>
              <input className="popup-form__input popup-form__input_type_card-link" type="url" name="link" id="image-link" placeholder="Ссылка на картинку" required />
              <span className="image-link-error popup-form__input-error"></span>
            </fieldset>
            <button className="popup__button popup-form__button" type="submit">Создать</button>
          </form>

          <button className="popup__close-button root__link" type="button"></button>
        </div>
      </div>

      <div className="popup popup_type_confirm">
        <div className="popup__container">
          <h2 className="popup__title popup__title_type_confirm">Вы уверены?</h2>
          <button className="popup__button popup__button_type_confirm" type="button">Да</button>
          <button className="popup__close-button root__link" type="button"></button>
        </div>
      </div>

      <div className="popup popup_type_show-card">
        <div className="popup__container popup__container_type_show-card">

          <figure className="popup__image-container">
            <img className="popup__image" src="#" alt="#" />
            <figcaption className="popup__image-caption"></figcaption>
          </figure>

          <button className="popup__close-button root__link" type="button"></button>
        </div>
      </div>

      <template className="cards-template">
        <li className="cards__list-item">
          <article className="card">
            <button className="card__delete-button root__link" type="button"></button>
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
