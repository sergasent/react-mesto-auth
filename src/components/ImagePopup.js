function ImagePopup() {
  return (
    <div className="popup popup_type_show-card">
      <div className="popup__container popup__container_type_show-card">

        <figure className="popup__image-container">
          <img className="popup__image" src="#" alt="#" />
          <figcaption className="popup__image-caption"></figcaption>
        </figure>

        <button className="popup__close-button page__link" type="button"></button>
      </div>
    </div>
  );
}

export default ImagePopup;