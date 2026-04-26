import "./header.css";
import Button from "../button/button";

function Header() {
  return (
    <header className="ui-header">
      <div className="ui-header__brand">
        <span className="ui-header__icon">🍃</span>
        <span className="ui-header__title">
          Kitchen<span className="ui-header__accent">Essentials</span>
        </span>
      </div>
      <nav className="ui-header__nav">
        <a href="/">Home</a>
        <a href="/">Shop</a>
        <a href="/">Collections</a>
        <a href="/">About</a>
      </nav>
      <div className="ui-header__actions">
        <div className="ui-header__search">
          <input placeholder="Search cookware..." />
        </div>
        <Button label="Shop Now" size="sm" />
      </div>
    </header>
  );
}

export default Header;
