
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">
          <h2>
            Glow <span>&</span> Grace
          </h2>

          <p className="footer-tagline">
            Wear your confidence. Own your style.
          </p>

          <p>
            Discover your style with our beautiful
            collection of fashion and everyday outfits.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/shop">Shop Collection</a>
          <a href="/wishlist">Wishlist</a>
          <a href="/cart">Shopping Cart</a>
        </div>

        {/* Customer Support */}
        <div className="footer-links">
          <h3>Customer Care</h3>
          <a href="/contact">Contact Us</a>
          <a href="/shipping">Shipping Policy</a>
          <a href="/returns">Returns & Exchanges</a>
          <a href="/privacy">Privacy Policy</a>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <h3>Stay in Style ✨</h3>

          <p>
            Subscribe for updates on new arrivals,
            fashion trends and special offers.
          </p>

          <form
            className="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault();
              alert("Thank you for joining Glow & Grace!");
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Enter your email"
              required
            />

            <button type="submit">
              Join
            </button>
          </form>

          <div className="footer-socials">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>

            <a
              href="https://www.pinterest.com/"
              target="_blank"
              rel="noreferrer"
            >
              Pinterest
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Glow & Grace.
          All rights reserved.
        </p>

        <p>Made with love ♡</p>
      </div>
    </footer>
  );
}

export default Footer;
