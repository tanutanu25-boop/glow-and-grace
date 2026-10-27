
function ProductCard({
  product,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={
            product.image ||
            "https://placehold.co/400x500?text=Glow+%26+Grace"
          }
          alt={product.name}
        />

        <button
          className={`wishlist-button ${
            isWishlisted ? "active" : ""
          }`}
          onClick={() => onToggleWishlist(product)}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          {isWishlisted ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-info">
        {product.category && (
          <p className="product-category">
            {product.category}
          </p>
        )}

        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <h3>₹{product.price}</h3>

        <p>
          {product.stock > 0
            ? `In stock: ${product.stock}`
            : "Out of stock"}
        </p>

        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
