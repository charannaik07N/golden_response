import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/ProductCard.jsx";
import Loader from "../components/Loader.jsx";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts(1, 8);
      setProducts(data.items || []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200"
      >
        <h1 className="text-3xl font-bold text-slate-900">
          Shop smarter, faster.
        </h1>
        <p className="text-slate-600 mt-2">
          Discover curated products with seamless checkout.
        </p>
        <button className="mt-4 px-5 py-2 bg-brand-500 text-white rounded-md">
          Browse products
        </button>
      </motion.section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Featured products</h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.externalId} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
