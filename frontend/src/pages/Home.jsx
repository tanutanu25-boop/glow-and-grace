
import { useEffect, useState, useCallback } from "react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import "../App.css";

import {
  Entrance,
  QuickViewModal,
  Toast,
  ProductSkeleton,
  BackToTop,
  useLuxuryToast,
} from "../features/LuxuryEffects";

function Home({ user, onLogout }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const { toast, showToast, hideToast } = useLuxuryToast();

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("glowGraceCart")
      ) || [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("glowGraceWishlist")
      ) || [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Fetch products from MongoDB backend
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        if (!response.ok) {
          throw new Error("Products could not load");
        }

        const data = await response.json();

        setProducts(
          Array.isArray(data) ? data : data.products || []
        );
      } catch {
        setError(
          "Products load nahi hue. Backend aur MongoDB check karo."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Save cart and wishlist
  useEffect(() => {
    localStorage.setItem("glowGraceCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "glowGraceWishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // Add to cart and show toast only when the addition succeeds
  function addToCart(product) {
    if (!product || !product._id) return;

    if (product.stock <= 0) {
      showToast("This product is currently out of stock.", "Out of stock");
      return;
    }

    const existing = cart.find(
      (item) => item._id === product._id
    );

    if (existing && existing.quantity >= product.stock) {
      showToast(
        "You've reached the available stock limit.",
        "Stock limit reached"
      );
      return;
    }

    setCart((currentCart) => {
      const currentItem = currentCart.find(
        (item) => item._id === product._id
      );

      if (currentItem) {
        if (currentItem.quantity >= product.stock) {
          return currentCart;
        }

        return currentCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });

    showToast(`${product.name} added to your shopping bag.`);
  }

  // Remove from cart
  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item._id !== productId)
    );

    showToast("The item was removed from your bag.", "Bag updated");
  }

  // Change cart quantity
  function changeQuantity(productId, amount) {
    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item._id !== productId) {
          return item;
        }

        const product = products.find(
          (p) => p._id === productId
        );

        const maxStock = product?.stock ?? item.stock;
        const quantity = Math.min(
          maxStock,
          Math.max(1, item.quantity + amount)
        );

        return { ...item, quantity };
      })
    );
  }

  // Toggle wishlist
  function toggleWishlist(product) {
    const alreadySaved = wishlist.some(
      (item) => item._id === product._id
    );

    setWishlist((currentWishlist) => {
      if (
        currentWishlist.some(
          (item) => item._id === product._id
        )
      ) {
        return currentWishlist.filter(
          (item) => item._id !== product._id
        );
      }

      return [...currentWishlist, product];
    });

    showToast(
      alreadySaved
        ? "Removed from your wishlist."
        : "Saved to your wishlist.",
      "Wishlist updated"
    );
  }

  // Stable callback for the toast component
  const closeToast = useCallback(() => {
    hideToast();
  }, [hideToast]);

  const wishlistIds = wishlist.map((item) => item._id);

  // Categories
  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  // Search, category, wishlist and sorting
  const filteredProducts = products
    .filter((product) => {
      const name = (product.name || "").toLowerCase();
      const description = (
        product.description || ""
      ).toLowerCase();
      const searchText = search.toLowerCase();

      const matchesSearch =
        name.includes(searchText) ||
        description.includes(searchText);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesWishlist =
        !showWishlistOnly ||
        wishlistIds.includes(product._id);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesWishlist
      );
    })
    .sort((a, b) => {
      if (sortOrder === "low-high") {
        return a.price - b.price;
      }

      if (sortOrder === "high-low") {
        return b.price - a.price;
      }

      return 0;
    });

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="shop-page">
      <Navbar
        user={user}
        onLogout={onLogout}
        cartCount={cartCount}
      />

      {/* Luxury entrance animation */}
      <Entrance>
        <header className="hero">
          <div className="hero-content">
            <p className="hero-tagline">
              THE NEW COLLECTION
            </p>

            <h1>
              Elegance in
              <br />
              Every Detail
            </h1>

            <p className="hero-description">
              Discover timeless styles made to celebrate
              your unique beauty.
            </p>

            <button
              className="hero-button"
              onClick={() =>
                document
                  .getElementById("collection")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Collection <span>→</span>
            </button>
          </div>

          <div className="hero-decoration">
            <span>G</span>
          </div>
        </header>
      </Entrance>

      <main className="shop-content">
        <Entrance>
          <h2 id="collection">Our Collection</h2>
        </Entrance>

        {/* Search and filters */}
        <div className="shop-filters">
          <input
            type="text"
            placeholder="Search your favourite style..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search products"
          />

          <select
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(event.target.value)
            }
            aria-label="Filter by category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(event) =>
              setSortOrder(event.target.value)
            }
            aria-label="Sort products"
          >
            <option value="default">Featured</option>
            <option value="low-high">
              Price: Low to High
            </option>
            <option value="high-low">
              Price: High to Low
            </option>
          </select>
        </div>

        {/* Wishlist filter */}
        <div className="wishlist-toolbar">
          <button
            className={`wishlist-filter ${
              showWishlistOnly ? "selected" : ""
            }`}
            onClick={() =>
              setShowWishlistOnly((current) => !current)
            }
          >
            ♥ {showWishlistOnly ? "Show All Products" : "My Wishlist"}
            <span className="wishlist-count">
              {wishlist.length}
            </span>
          </button>
        </div>

        {/* Animated loading skeleton */}
        {loading && <ProductSkeleton count={8} />}

        {error && (
          <p className="error-message">{error}</p>
        )}

        {!loading && !error && (
          <>
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <Entrance
                  key={product._id}
                  className="luxury-product-entrance"
                >
                  <ProductCard
                    product={product}
                    onAddToCart={addToCart}
                    isWishlisted={wishlistIds.includes(product._id)}
                    onToggleWishlist={toggleWishlist}
                    onQuickView={setQuickViewProduct}
                  />
                </Entrance>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <p className="no-products">
                {showWishlistOnly
                  ? "Your wishlist is empty. Add your favourite products using the heart button!"
                  : "No products found. Try another search."}
              </p>
            )}
          </>
        )}

        {/* Shopping cart */}
        <section className="cart-section" id="shopping-cart">
          <h2>Your Shopping Cart ({cartCount})</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item._id}>
                  <span>{item.name}</span>

                  <div className="cart-actions">
                    <button
                      onClick={() =>
                        changeQuantity(item._id, -1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        changeQuantity(item._id, 1)
                      }
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>

                  <span>
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}

              <h3>
                Total: ₹{cartTotal.toLocaleString("en-IN")}
              </h3>
            </>
          )}
        </section>
      </main>

      {/* Quick View modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />

      {/* Animated toast */}
      <Toast toast={toast} onClose={closeToast} />

      {/* Floating Back-to-Top button */}
      <BackToTop />
    </div>
  );
}

export default Home;
