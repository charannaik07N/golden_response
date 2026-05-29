import { useCart } from "../context/CartContext.jsx";
import EmptyState from "../components/EmptyState.jsx";
import QuantitySelector from "../components/QuantitySelector.jsx";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateItem, removeItem } = useCart();
  const items = cart.products || [];

  if (items.length === 0) {
    return (
      <EmptyState
        title="Cart is empty"
        subtitle="Add products to start shopping."
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Your cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.productId._id}
            className="bg-white border rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold">{item.productId.title}</h3>
              <p className="text-sm text-slate-500">${item.productId.price}</p>
            </div>
            <div className="flex items-center gap-4">
              <QuantitySelector
                value={item.quantity}
                onChange={(qty) => updateItem(item.productId._id, qty)}
              />
              <button
                className="text-sm text-red-500"
                onClick={() => removeItem(item.productId._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-lg font-semibold">
          Total: ${cart.totalAmount}
        </span>
        <Link
          className="px-4 py-2 bg-brand-500 text-white rounded"
          to="/checkout"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
