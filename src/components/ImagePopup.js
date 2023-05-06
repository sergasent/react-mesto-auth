function ImagePopup(props) {
  return (
    <div className={`popup popup_type_show-card ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_show-card">

        <figure className="popup__image-container">
          <img 
            className="popup__image" 
            src={props.card?.link ?? '#'} 
            alt={props.card?.name ?? '#'} 
          />
          <figcaption className="popup__image-caption">{props.card?.name ?? '#'}</figcaption>
        </figure>

        <button onClick={props.onClose} className="popup__close-button page__link" type="button"></button>
      </div>
    </div>
  );
}

export default ImagePopup;