import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const OrderSuccess = () => (
  <div className="max-w-xl mx-auto px-4 py-16 text-center">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white border rounded-xl p-8"
    >
      <h1 className="text-2xl font-semibold">Order placed successfully</h1>
      <p className="text-slate-500 mt-2">Thank you for shopping with us.</p>
      <Link
        className="inline-block mt-6 px-4 py-2 bg-brand-500 text-white rounded"
        to="/products"
      >
        Continue shopping
      </Link>
    </motion.div>
  </div>
);

export default OrderSuccess;
