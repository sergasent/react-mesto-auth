function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">

        <h2 className="popup__title">{props.title}</h2>
        <form 
          className="popup-form"
          name={`${props.name}-form`} 
          method="post" 
          action="/" 
          noValidate
        >
          <fieldset className="popup-form__input-group">
            {props.children}
          </fieldset>
          <button className="popup__button popup-form__button" type="submit">
            {props.buttonText || 'Сохранить'}
          </button>
        </form>

        <button onClick={props.onClose} className="popup__close-button page__link" type="button"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;