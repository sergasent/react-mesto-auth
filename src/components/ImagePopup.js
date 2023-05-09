function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_show-card ${card ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_show-card">
        <figure className="popup__image-container">
          <img
            className="popup__image"
            src={card?.link ?? "#"}
            alt={card?.name ?? "#"}
          />
          <figcaption className="popup__image-caption">
            {card?.name ?? "#"}
          </figcaption>
        </figure>

        <button
          onClick={onClose}
          className="popup__close-button page__link"
          type="button"
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
