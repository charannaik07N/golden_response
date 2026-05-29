import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import Loader from "../components/Loader.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import useDebounce from "../hooks/useDebounce";

const Products = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchProducts(1, 40);
      setItems(data.items || []);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(debounced.toLowerCase()),
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.externalId} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
