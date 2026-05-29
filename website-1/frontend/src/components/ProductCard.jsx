import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
    >
      <Link to={`/products/${product.externalId}`}>
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="h-40 w-full object-cover rounded-lg mb-3"
        />
        <h3 className="font-semibold text-slate-800">{product.title}</h3>
      </Link>
      <div className="flex items-center justify-between mt-2">
        <span className="text-brand-700 font-semibold">${product.price}</span>
        <button
          className="px-3 py-1 text-sm bg-brand-500 text-white rounded-md"
          onClick={() =>
            addItem(product._id || product.id || product.externalId, 1)
          }
        >
          Add to cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
