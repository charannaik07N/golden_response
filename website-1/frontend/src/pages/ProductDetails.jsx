import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../api/products";
import Loader from "../components/Loader.jsx";
import QuantitySelector from "../components/QuantitySelector.jsx";
import { useCart } from "../context/CartContext.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProduct(id);
      setProduct(data);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-2">
      <div>
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full rounded-xl border"
        />
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p className="text-slate-600 mt-2">{product.description}</p>
        <div className="mt-4 text-brand-700 font-semibold text-xl">
          ${product.price}
        </div>
        <div className="mt-4">
          <QuantitySelector value={qty} onChange={setQty} />
        </div>
        <button
          className="mt-6 px-4 py-2 bg-brand-500 text-white rounded"
          onClick={() => addItem(product._id || product.externalId, qty)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
