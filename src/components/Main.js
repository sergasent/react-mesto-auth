function Main() {
  return (
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
  );
}

export default Main;