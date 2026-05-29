import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const count =
    cart.products?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-brand-700">
          Golden Response
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart ({count})</Link>
          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <button className="text-brand-700" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-brand-700">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
