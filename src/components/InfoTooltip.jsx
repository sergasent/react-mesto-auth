/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

function InfoTooltip({
  name, isOpen, onClose,
}) {
  function handleQuitClick(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onClick={handleQuitClick}
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''} popup_opened`}
    >
      <div className="modal-block">

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

export default InfoTooltip;
