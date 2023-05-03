function Main(props) {
  return (
    <main className="main page__section">
      <section className="profile" aria-label="Информация о профиле пользователя">
        <div className="profile__container">
          <a onClick={props.onEditAvatar} href="#" className="profile__avatar-link" ><img src="#" alt="Аватар пользователя" className="profile__image" /></a>
          <div className="profile__info">
            <h1 className="profile__name">Загрузка данных...</h1>
            <button onClick={props.onEditProfile} className="profile__edit-button page__link" type="button"></button>
            <p className="profile__description">Загрузка данных...</p>
          </div>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-button page__link" type="button"></button>
      </section>

      <section className="cards" aria-label="Список изображений">
        <ul className="cards__list">

        </ul>
      </section>
    </main>
  );
}

export default Main;