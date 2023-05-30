/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

function InfoTooltip({
  isOpen, isSuccessful, onClose, imgSuccessful, imgFailed, textSuccessful, textFailed,
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
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className="modal-block modal-block_type_info">
        <img className="modal-block__info-image" src={isSuccessful ? imgSuccessful : imgFailed} alt="" />
        <h2 className="modal-block__info-text">{isSuccessful ? textSuccessful : textFailed}</h2>
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
