function Header(props) {
  return (
    <header className="header page__section">
      <img src={props.logo} alt="Mesto Russia" lang="en" className="logo" />
    </header>
  );
}

export default Header;