
import {
  useEffect,
  useState,
  useCallback,
} from "react";

import "./LuxuryEffects.css";

// 1. Entrance animation
export function Entrance({ children, className = "" }) {
  return (
    <div className={`luxury-entrance ${className}`}>
      {children}
    </div>
  );
}

// 2. Quick View modal
export function QuickViewModal({
  product,
  onClose,
  onAddToCart,
}) {
  useEffect(() => {
    if (!product) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = previousOverflow;
    };
  }, [product, onClose]);

  if (!product) return null;

  const title =
    product.name || product.title || "Beautiful find";

  const image =
    product.imageUrl ||
    product.image ||
    product.images?.[0] ||
    product.photo ||
    "";

  const price = product.price;

  return (
    <div
      className="luxury-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="luxury-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${title}`}
      >
        <button
          type="button"
          className="luxury-modal-close"
          onClick={onClose}
          aria-label="Close quick view"
        >
          ×
        </button>

        <div className="luxury-modal-image">
          {image ? (
            <img src={image} alt={title} />
          ) : (
            <div className="luxury-no-image">
              Image unavailable
            </div>
          )}
        </div>

        <div className="luxury-modal-details">
          <p className="luxury-eyebrow">
            GLOW &amp; GRACE · CURATED FOR YOU
          </p>

          <h2>{title}</h2>

          {product.category && (
            <p className="luxury-product-category">
              {product.category}
            </p>
          )}

          {price != null && (
            <p className="luxury-modal-price">
              ₹{Number(price).toLocaleString("en-IN")}
            </p>
          )}

          <p className="luxury-modal-description">
            {product.description ||
              "A thoughtfully selected piece to complement your personal style."}
          </p>

          <button
            type="button"
            className="luxury-primary-button"
            onClick={() => onAddToCart(product)}
          >
            Add to bag
          </button>

          <p className="luxury-modal-note">
            A little luxury, every day.
          </p>
        </div>
      </section>
    </div>
  );
}

// 3. Toast notification
export function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onClose();
    }, 2800);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div
      className="luxury-toast"
      role="status"
      aria-live="polite"
      key={toast.id}
    >
      <span className="luxury-toast-check">✓</span>

      <div>
        <strong>{toast.title}</strong>
        <p>{toast.message}</p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}

// Toast state helper
export function useLuxuryToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    (message, title = "Lovely choice!") => {
      setToast({
        id: Date.now(),
        title,
        message,
      });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
}

// 4. Product loading skeleton
export function ProductSkeleton({ count = 8 }) {
  return (
    <div
      className="luxury-skeleton-grid"
      aria-label="Loading products"
      aria-busy="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          className="luxury-skeleton-card"
          key={index}
        >
          <div className="luxury-skeleton-image" />

          <div className="luxury-skeleton-line luxury-line-long" />

          <div className="luxury-skeleton-line luxury-line-short" />

          <div className="luxury-skeleton-line luxury-line-price" />
        </div>
      ))}
    </div>
  );
}

// 5. Floating Back-to-Top button
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 350);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <button
      type="button"
      className={`luxury-back-to-top ${
        visible ? "is-visible" : ""
      }`}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      ↑
    </button>
  );
}
