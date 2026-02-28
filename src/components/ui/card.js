import "./card.css";

function Card({ image, name, price, salePrice, description, category, reviews }) {
  const onSale = Boolean(salePrice);
  return (
    <div className="card">
      <div className="card-media">
        <img src={image} alt={name} className="card-img" />
        {onSale ? <span className="sale-badge">Sale</span> : null}
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="card-category">{category}</span>
          <span className="card-fav">♡</span>
        </div>
        <h3 className="card-title">{name}</h3>
        {description ? <p className="card-desc">{description}</p> : null}
        <div className="card-rating">
          <span className="card-stars">★★★★★</span>
          <span className="card-reviews">{reviews}</span>
        </div>
        <div className="card-price-row">
          {onSale ? <span className="price-old">${price}</span> : null}
          <span className={onSale ? "price-new" : "card-price"}>
            {onSale ? `$${salePrice}` : `$${price}`}
          </span>
        </div>
        <button className="card-btn">Add to Cart</button>
      </div>
    </div>
  );
}

export default Card;
