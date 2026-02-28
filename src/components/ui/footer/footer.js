import "./footer.css";
import Button from "../button/button";

function Footer() {
  return (
    <footer className="ui-footer">
      <div className="ui-footer__brand">
        <div className="ui-footer__logo">🍃</div>
        <p>Kitchen essentials for every home chef.</p>
      </div>
      <div className="ui-footer__links">
        <div>
          <h4>Shop</h4>
          <a href="/">Cookware</a>
          <a href="/">Bakeware</a>
          <a href="/">Tools</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="/">About</a>
          <a href="/">Careers</a>
          <a href="/">Sustainability</a>
        </div>
        <div>
          <h4>Support</h4>
          <a href="/">FAQ</a>
          <a href="/">Shipping</a>
          <a href="/">Contact</a>
        </div>
      </div>
      <div className="ui-footer__subscribe">
        <h4>Subscribe</h4>
        <p>Get updates on deals and new releases.</p>
        <div className="ui-footer__form">
          <input placeholder="Email address" />
          <Button label="Send" size="sm" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
