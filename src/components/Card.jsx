function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="cards__list-item">
      <article className="card">
        <button
          className="card__delete-button root__link"
          type="button"
        ></button>
        <img
          onClick={handleClick}
          src={card.link ?? "#"}
          alt={card.name ?? ""}
          className="card__image"
        />
        <div className="card__description">
          <h2 className="card__title">{card.name ?? ""}</h2>
          <div className="card__like-container">
            <button className="card__like-button" type="button"></button>
            <p className="card__likes-counter">{card.likes?.length ?? ""}</p>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Card;
