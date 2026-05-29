const Product = require("../models/Product");
const normalizeProduct = require("../utils/normalizeProduct");
const { fetchWithRetry } = require("../utils/externalApi");
const cache = require("../utils/cacheStore");

const getProductsFromApi = async () => {
  const apiUrl = process.env.PRODUCTS_API || "https://dummyjson.com/products";
  const data = await fetchWithRetry(apiUrl);
  return data.products || [];
};

const listProducts = async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 12);
    const cacheKey = `products:${page}:${limit}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const products = await getProductsFromApi();
    const normalized = products.map(normalizeProduct);

    const start = (page - 1) * limit;
    const paged = normalized.slice(start, start + limit);

    const payload = {
      page,
      limit,
      total: normalized.length,
      items: paged,
    };

    cache.set(cacheKey, payload);
    return res.json(payload);
  } catch (err) {
    return next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cacheKey = `product:${id}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const apiUrl = `${process.env.PRODUCTS_API || "https://dummyjson.com/products"}/${id}`;
    const data = await fetchWithRetry(apiUrl);
    const normalized = normalizeProduct(data);
    cache.set(cacheKey, normalized);
    return res.json(normalized);
  } catch (err) {
    return next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (err) {
    return next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (err) {
    return next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
