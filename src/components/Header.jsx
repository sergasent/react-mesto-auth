import React from 'react';
import { Link } from 'react-router-dom';

function Header({
  logo,
  userEmail,
  headerState: { link, linkText, linkFunc },
}) {
  return (
    <header className="header page__section">
      <img src={logo ?? ''} alt="Mesto Russia" lang="en" className="logo" />
      <div className="header__info">
        {userEmail && <p className="header__user-info">{userEmail}</p>}
        <Link
          className="page__link header__link"
          to={link}
          onClick={linkFunc}
        >
          {linkText}
        </Link>
      </div>
    </header>
  );
}

export default Header;
