function Card(props) {
  return (
    <li className="cards__list-item">
      <article className="card">
        <button className="card__delete-button root__link" type="button"></button>
        <a href="#" className="card__link">
          <img src={props.card.link} alt={props.card.name} className="card__image" />
        </a>
        <div className="card__description">
          <h2 className="card__title">{props.card.name}</h2>
          <div className="card__like-container">
            <button className="card__like-button" type="button"></button>
            <p className="card__likes-counter">{props.card.likes.length}</p>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Card;