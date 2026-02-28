import CardList from "./components/cardlist";
import "./page.css";

function Homepage() {
  return (
    <main className="home-page">
      <header className="wf-topbar">
        <div className="brand">
          <span className="brand-icon">🍃</span>
          Kitchen<span className="brand-accent">Essentials</span>
        </div>
        <nav className="wf-nav">
          <a href="/">Home</a>
          <a href="/">Shop</a>
          <a href="/">New Arrivals</a>
          <a href="/">Sale</a>
          <a href="/">Blog</a>
        </nav>
        <div className="search-bar">
          <input placeholder="Search for products..." />
          <button className="search-btn">Search</button>
        </div>
        <div className="wf-icons">
          <span>🔍</span>
          <span>♡</span>
          <span className="wf-cart">🛒</span>
        </div>
      </header>

      <section className="wf-hero">
        <div className="wf-hero-content">
          <p className="wf-kicker">Kitchen Essentials</p>
          <h1>
            Upgrade Your Kitchen
            <br />
            with Chef-Ready Tools
          </h1>
          <p className="wf-subtitle">
            Save up to 40% on cookware sets, prep tools, and daily must-haves
            built for real kitchens.
          </p>
          <div className="hero-cta">
            <button className="wf-btn">Shop Now</button>
            <button className="wf-btn ghost">Explore New Arrivals</button>
          </div>
          <div className="hero-perks">
            <div>
              <strong>Free Shipping</strong>
              <p>Orders over $50</p>
            </div>
            <div>
              <strong>Easy Returns</strong>
              <p>30-day guarantee</p>
            </div>
            <div>
              <strong>24/7 Support</strong>
              <p>Customer service</p>
            </div>
          </div>
        </div>
        <div className="wf-hero-image hero-photo" />
      </section>

      <section className="promo-row">
        <div className="promo-card spring-sale">
          <div>
            <h3>Spring Sale</h3>
            <p>Up to 30% off kitchen favorites</p>
            <button className="wf-btn">Shop the Sale</button>
          </div>
          <div className="promo-image promo-left" />
        </div>
        <div className="promo-card new-arrivals">
          <div>
            <h3>New Arrivals</h3>
            <p>Trendy kitchen gadgets</p>
            <button className="wf-btn ghost">Shop Now</button>
          </div>
          <div className="promo-image promo-right" />
        </div>
      </section>

      <section className="wf-trendy">
        <h2>Best Sellers</h2>
        <p className="section-sub">
          Handpicked cookware, bakeware, and kitchen tools customers love.
        </p>
      </section>

      <CardList />

      <div className="wf-load-more">
        <button className="wf-btn ghost">Load More</button>
      </div>

      <section className="mid-row">
        <div className="category-panel">
          <h3>Top Categories</h3>
          <div className="category-grid">
            <div className="category-card">
              <div className="category-image cookware" />
              <p>Cookware</p>
            </div>
            <div className="category-card">
              <div className="category-image bakeware" />
              <p>Bakeware</p>
            </div>
            <div className="category-card">
              <div className="category-image tools" />
              <p>Kitchen Tools</p>
            </div>
          </div>
        </div>
        <div className="review-panel">
          <h3>Customer Reviews</h3>
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p>
              “Love my new cookware set! Great quality and fast shipping.”
            </p>
            <span>— Sarah L.</span>
          </div>
        </div>
      </section>

      <footer className="wf-footer">
        <div>
          <div className="wf-logo small" />
          <p>Kitchen essentials for every home chef.</p>
          <div className="wf-footer-dots">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="wf-footer-links">
          <div>
            <h4>Shop</h4>
            <a href="/">Cookware</a>
            <a href="/">Bakeware</a>
            <a href="/">Kitchen Tools</a>
            <a href="/">Bundles</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="/">About</a>
            <a href="/">Careers</a>
            <a href="/">Press</a>
            <a href="/">Sustainability</a>
          </div>
          <div>
            <h4>Help</h4>
            <a href="/">FAQs</a>
            <a href="/">Shipping</a>
            <a href="/">Returns</a>
            <a href="/">Contact</a>
          </div>
        </div>
        <div>
          <h4>Subscribe</h4>
          <p>Get updates on deals and new releases.</p>
          <div className="wf-subscribe">
            <input placeholder="Email address" />
            <button className="wf-btn">Send</button>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Homepage;
