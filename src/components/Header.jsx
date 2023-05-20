import React from 'react';

function Header({ logo }) {
  return (
    <header className="header page__section">
      <img src={logo ?? ''} alt="Mesto Russia" lang="en" className="logo" />
    </header>
  );
}

export default Header;
