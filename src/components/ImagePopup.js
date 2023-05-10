function ImagePopup({ card: { link, name }, onClose }) {
  return (
    <div className={`popup popup_type_show-card ${link && "popup_opened"}`}>
      <div className="popup__container popup__container_type_show-card">
        <figure className="popup__image-container">
          <img className="popup__image" src={link} alt={name} />
          <figcaption className="popup__image-caption">{name}</figcaption>
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
