import React from 'react';

function PopupWithForm({
  name, isOpen, title, children, buttonText, onClose,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup-form"
          name={`${name}-form`}
          method="post"
          action="/"
          noValidate
        >
          <fieldset className="popup-form__input-group">{children}</fieldset>
          <button className="popup__button popup-form__button" type="submit">
            {buttonText || 'Сохранить'}
          </button>
        </form>

        <button
          onClick={onClose}
          className="popup__close-button page__link"
          type="button"
          aria-label="Закрыть"
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
