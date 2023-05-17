import React, { useState } from 'react';

function PopupWithForm({
  name, isOpen, title, children, buttonText, onClose, onSubmit,
}) {
  const [buttonCaption, setButtonText] = useState(buttonText || 'Сохранить');
  const defaultButtonCaption = buttonCaption;

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText('Загрузка');
    onSubmit()
      .finally(() => setTimeout(() => {
        setButtonText(defaultButtonCaption);
      }, 300)); // 300мс на анимацию закрытия
  }

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={handleSubmit}
          className="popup-form"
          name={`${name}-form`}
          method="post"
          action="/"
          noValidate
        >
          <fieldset className="popup-form__input-group">{children}</fieldset>
          <button className="popup__button popup-form__button" type="submit">
            {buttonCaption}
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
