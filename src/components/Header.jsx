import React from 'react';
import { Link } from 'react-router-dom';

function Header({ logo, headerState }) {
  return (
    <header className="header page__section">
      <img src={logo ?? ''} alt="Mesto Russia" lang="en" className="logo" />
      <div className="header__info">
        {headerState?.userInfo && <p className="header__user-info" />}
        <Link className="page__link header__link" to={headerState?.link}>{headerState?.linkText}</Link>
      </div>
    </header>
  );
}

export default Header;
