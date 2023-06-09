import React from 'react';
import { useNavigate } from 'react-router-dom';

const MissingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="missing-page">
      <p className="missing-page__text">Это какое-то неправильное место...</p>
      <h2 className="missing-page__title">404</h2>
      <button
        onClick={() => navigate(-1)}
        className="page__link missing-page__back-link"
        type="button"
      >
        Вернуться назад
      </button>
    </div>
  );
};

export default MissingPage;
