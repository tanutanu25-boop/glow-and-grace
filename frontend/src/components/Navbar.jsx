
function Navbar({ user, onLogout, cartCount }) {
  return (
    <nav className="navbar">
      <h2 className="brand">Glow & Grace</h2>

      <div className="nav-right">
        <span>Welcome, {user?.name || user?.email || "Customer"}</span>
        <span>Cart: {cartCount}</span>

        <button onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
