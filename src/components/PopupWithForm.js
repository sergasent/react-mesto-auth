function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">

        <h2 className="popup__title">{props.title}</h2>
        <form 
          className={`popup-form popup-form_type_${props.name}-form`} 
          name={`${props.name}-form`} 
          method="post" 
          action="/" 
          noValidate
        >
          {props.children}
          <button className="popup__button popup-form__button" type="submit">{props.buttonText}</button>
        </form>

        <button onClick={props.onClose} className="popup__close-button page__link" type="button"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;