import { useState } from "react";
import { createOrder } from "../api/orders";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await createOrder(form);
    setLoading(false);
    navigate("/order-success");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full border rounded px-3 py-2"
          name="name"
          placeholder="Full name"
          onChange={handleChange}
        />
        <input
          className="w-full border rounded px-3 py-2"
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />
        <input
          className="w-full border rounded px-3 py-2"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />
        <input
          className="w-full border rounded px-3 py-2"
          name="postalCode"
          placeholder="Postal code"
          onChange={handleChange}
        />
        <button
          className="w-full bg-brand-500 text-white rounded py-2"
          disabled={loading}
        >
          {loading ? "Placing order..." : "Place order"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
